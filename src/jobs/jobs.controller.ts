import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':id')
  find(@Param('id') id): Promise<Job> {
    return this.jobsService
      .find(id)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
      });
  }

  @Post()
  create(@Body(ValidationPipe) job: JobDTO): Promise<Job> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  update(@Param('id') id, @Body() job: JobDTO): Promise<Job> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Job> {
    return this.jobsService.delete(id);
  }
}
