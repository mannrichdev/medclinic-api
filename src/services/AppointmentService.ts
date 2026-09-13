import { appointmentRepository } from '../repositories/appointmentRepository';
import { userRepository } from '../repositories/userRepository';
import { patientRepository } from '../repositories/patientRepository';

interface ICreateAppointmentRequest {
  appointment_date: Date;
  user_id: string;
  patient_id: string;
}

export class AppointmentService {
  async create({ appointment_date, user_id, patient_id }: ICreateAppointmentRequest) {
    const userExists = await userRepository.findOneBy({ id: user_id });
    if (!userExists) {
      throw new Error('Usuário/Médico não encontrado');
    }

    const patientExists = await patientRepository.findOneBy({ id: patient_id });
    if (!patientExists) {
      throw new Error('Paciente não encontrado');
    }

    const appointmentExists = await appointmentRepository.findOneBy({
      user_id,
      appointment_date: new Date(appointment_date),
    });

    if (appointmentExists) {
      throw new Error('O médico já possui um agendamento neste mesmo horário');
    }

    const appointment = appointmentRepository.create({
      appointment_date,
      user_id,
      patient_id,
    });

    await appointmentRepository.save(appointment);
    return appointment;
  }

  async listAll() {
    return await appointmentRepository.find({
      relations: ['user', 'patient'],
    });
  }

  async delete(id: string): Promise<void> {
    const result = await appointmentRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Agendamento não encontrado');
    }
  }
}