import { Request, Response } from 'express';
import { AppointmentService } from '../services/AppointmentService';

export class AppointmentController {
  async create(req: Request, res: Response): Promise<Response> {
    const { appointment_date, user_id, patient_id } = req.body;

    try {
      const appointmentService = new AppointmentService();
      const appointment = await appointmentService.create({
        appointment_date,
        user_id,
        patient_id,
      });
      return res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const appointmentService = new AppointmentService();
      const appointments = await appointmentService.listAll();
      return res.json(appointments);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const appointmentService = new AppointmentService();
      await appointmentService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}