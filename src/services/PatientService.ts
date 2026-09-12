import { patientRepository } from '../repositories/patientRepository';

interface IPatientRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export class PatientService {
  async create({ name, email, phone }: Required<IPatientRequest>) {
    const patientExists = await patientRepository.findOneBy({ email });
    if (patientExists) {
      throw new Error('Já existe um paciente cadastrado com este e-mail');
    }

    const patient = patientRepository.create({ name, email, phone });
    await patientRepository.save(patient);
    return patient;
  }

  async listAll() {
    return await patientRepository.find();
  }

  async findById(id: string) {
    const patient = await patientRepository.findOneBy({ id });
    if (!patient) {
      throw new Error('Paciente não encontrado');
    }
    return patient;
  }

  async update(id: string, { name, email, phone }: IPatientRequest) {
    const patient = await patientRepository.findOneBy({ id });
    if (!patient) {
      throw new Error('Paciente não encontrado');
    }

    if (email && email !== patient.email) {
      const emailExists = await patientRepository.findOneBy({ email });
      if (emailExists) {
        throw new Error('E-mail já cadastrado por outro paciente');
      }
    }

    patient.name = name ?? patient.name;
    patient.email = email ?? patient.email;
    patient.phone = phone ?? patient.phone;

    await patientRepository.save(patient);
    return patient;
  }

  async delete(id: string) {
    const patient = await patientRepository.findOneBy({ id });
    if (!patient) {
      throw new Error('Paciente não encontrado');
    }
    await patientRepository.remove(patient);
  }
}