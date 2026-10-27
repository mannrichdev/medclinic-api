import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Doctor } from '../entities/Doctor';
import { Specialty } from '../entities/Specialty';

export class DoctorController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, crm, email, phone, specialty_id } = req.body;

    if (!name || !crm || !email) {
      return res.status(400).json({ error: 'Nome, CRM e e-mail são obrigatórios.' });
    }

    const doctorRepository = AppDataSource.getRepository(Doctor);

    const existingDoctor = await doctorRepository.findOneBy({ crm });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Médico com este CRM já está cadastrado.' });
    }

    if (specialty_id) {
      const specialtyRepository = AppDataSource.getRepository(Specialty);
      const specialtyExists = await specialtyRepository.findOneBy({ id: specialty_id });
      if (!specialtyExists) {
        return res.status(404).json({ error: 'Especialidade informada não foi encontrada.' });
      }
    }

    const doctor = doctorRepository.create({
      name,
      crm,
      email,
      phone,
      specialty_id
    });

    await doctorRepository.save(doctor);

    return res.status(201).json(doctor);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const doctorRepository = AppDataSource.getRepository(Doctor);
    const doctors = await doctorRepository.find({
      relations: ['specialty']
    });
    return res.json(doctors);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const doctorRepository = AppDataSource.getRepository(Doctor);

    const doctor = await doctorRepository.findOne({
      where: { id },
      relations: ['specialty']
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Médico não encontrado.' });
    }

    return res.json(doctor);
  }
}