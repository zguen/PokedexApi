import { PartialType } from "@nestjs/swagger";
import { CreateCaptureDto } from "./create-capture.dto";

export class UpdateCaptureDto extends PartialType(CreateCaptureDto) {}