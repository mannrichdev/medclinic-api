import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Patient } from '../entities/Patient';

export class PatientController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, cpf, birth_date } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    const patientRepository = AppDataSource.getRepository(Patient);

    const existingEmail = await patientRepository.findOneBy({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Paciente com este e-mail já está cadastrado.' });
    }

    if (cpf) {
      const existingCpf = await patientRepository.findOneBy({ cpf });
      if (existingCpf) {
        return res.status(400).json({ error: 'Paciente com este CPF já está cadastrado.' });
      }
    }

    const patient = patientRepository.create({
      name,
      email,
      phone,
      cpf,
      birth_date
    });

    await patientRepository.save(patient);

    return res.status(201).json(patient);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patients = await patientRepository.find();
    return res.json(patients);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const patientRepository = AppDataSource.getRepository(Patient);

    const patient = await patientRepository.findOneBy({ id });
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado.' });
    }

    return res.json(patient);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, phone, cpf, birth_date } = req.body;

    const patientRepository = AppDataSource.getRepository(Patient);
    const patient = await patientRepository.findOneBy({ id });

    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado.' });
    }

    patient.name = name ?? patient.name;
    patient.email = email ?? patient.email;
    patient.phone = phone ?? patient.phone;
    patient.cpf = cpf ?? patient.cpf;
    patient.birth_date = birth_date ?? patient.birth_date;

    await patientRepository.save(patient);

    return res.json(patient);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const patientRepository = AppDataSource.getRepository(Patient);

    const patient = await patientRepository.findOneBy({ id });
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado.' });
    }

    await patientRepository.remove(patient);

    return res.status(204).send();
  }
}