import { Request, Response } from 'express';
import { PatientService } from '../services/PatientService';

export class PatientController {
  async create(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    try {
      const patientService = new PatientService();
      const patient = await patientService.create({ name, email, phone });
      return res.status(201).json(patient);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const patientService = new PatientService();
      const patients = await patientService.listAll();
      return res.json(patients);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const patientService = new PatientService();
      const patient = await patientService.findById(id);
      return res.json(patient);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
      const patientService = new PatientService();
      const patient = await patientService.update(id, { name, email, phone });
      return res.json(patient);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const patientService = new PatientService();
      await patientService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}