import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Specialty } from '../entities/Specialty';

export class SpecialtyController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'O nome da especialidade é obrigatório.' });
    }

    const specialtyRepository = AppDataSource.getRepository(Specialty);

    const existingSpecialty = await specialtyRepository.findOneBy({ name });
    if (existingSpecialty) {
      return res.status(400).json({ error: 'Especialidade já cadastrada.' });
    }

    const specialty = specialtyRepository.create({ name, description });
    await specialtyRepository.save(specialty);

    return res.status(201).json(specialty);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const specialtyRepository = AppDataSource.getRepository(Specialty);
    const specialties = await specialtyRepository.find();
    return res.json(specialties);
  }
}