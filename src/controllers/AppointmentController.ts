import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Appointment } from '../entities/Appointment';
import { User } from '../entities/User';
import { Patient } from '../entities/Patient';

export class AppointmentController {
  async create(req: Request, res: Response): Promise<Response> {
    const { appointment_date, user_id, patient_id } = req.body;

    if (!appointment_date || !user_id || !patient_id) {
      return res.status(400).json({
        error: 'Data da consulta (appointment_date), ID do usuário (user_id) e ID do paciente (patient_id) são obrigatórios.',
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const patientRepository = AppDataSource.getRepository(Patient);
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    const user = await userRepository.findOneBy({ id: user_id });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const patient = await patientRepository.findOneBy({ id: patient_id });
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado.' });
    }

    const appointment = appointmentRepository.create({
      appointment_date: new Date(appointment_date),
      user,
      patient,
    });

    await appointmentRepository.save(appointment);

    return res.status(201).json(appointment);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointments = await appointmentRepository.find({
      relations: ['user', 'patient'],
    });
    return res.json(appointments);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    const appointment = await appointmentRepository.findOne({
      where: { id },
      relations: ['user', 'patient'],
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Consulta não encontrada.' });
    }

    return res.json(appointment);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    const appointment = await appointmentRepository.findOneBy({ id });
    if (!appointment) {
      return res.status(404).json({ error: 'Consulta não encontrada.' });
    }

    await appointmentRepository.remove(appointment);

    return res.status(204).send();
  }
}