import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerSenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(
    userEmail: string,
    confirmationLink: string,
  ): Promise<void> {
    const htmlContent = `<p>Cliquez sur le lien ci-dessous pour confirmer votre compte : <a href="${confirmationLink}">Confirmer le compte</a></p>`;

    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Confirmation Email',
      html: htmlContent,
    });
  }
}
