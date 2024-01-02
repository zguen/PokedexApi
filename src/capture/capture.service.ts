import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capture } from './entities/capture.entity';
import { UpdateCaptureDto } from './dto/update-capture.dto';

@Injectable()
export class CaptureService {
  constructor(
    @InjectRepository(Capture)
    private readonly captureRepository: Repository<Capture>,
  ) {}

  async updateCaptureInfo(
    trainerId: number,
    pokemonId: number,
    updateCaptureDto: UpdateCaptureDto,
  ): Promise<Capture> {
    let Capture = await this.captureRepository.findOne({
      where: { id_trainer: trainerId, id_pokemon: pokemonId },
    });
    if (!Capture) {
      throw new NotFoundException('Capture not found');
    }
    if (updateCaptureDto.game_id) {
      Capture.game_id = updateCaptureDto.game_id;
    }
    // Sauvegarder les modifications dans la base de données
    await this.captureRepository.save(Capture);
    return Capture;
  }

  async isPokemonCaptured(
    trainerId: number,
    pokemonId: number,
  ): Promise<boolean> {
    const capture = await this.captureRepository.findOne({
      where: { id_trainer: trainerId, id_pokemon: pokemonId },
    });

    return !!capture; // Retourne true si la capture existe, sinon false
  }
}
