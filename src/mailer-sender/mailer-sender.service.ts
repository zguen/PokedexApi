import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerSenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(
    userEmail: string,
    confirmationLink: string,
  ): Promise<void> {
    const htmlContent = `<p>Cliquez sur le lien ci-dessous pour confirmer votre compte : <a href="${confirmationLink}">Confirmer le compte</a></p>`;
    const htmlContent2 = `<p>Inscription d'un nouvel utilisateur ${userEmail}`;
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Confirmation Email',
        html: htmlContent,
      });

      await this.mailerService.sendMail({
        to: 'admin@pokedexjunior.fr',
        subject: 'Nouvelle Inscription',
        html: htmlContent2,
      });
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw new InternalServerErrorException(
        "Erreur lors de l'envoi du courriel de confirmation",
      );
    }
  }
  async sendResetPasswordEmail(
    userEmail: string,
    confirmationLink: string,
  ): Promise<void> {
    const htmlContent = `<p>Cliquez sur le lien ci-dessous pour modifier votre mot de passe : <a href="${confirmationLink}">Modifier le mot de passe</a></p>`;
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Modification du mot de passe',
        html: htmlContent,
      });
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw new InternalServerErrorException(
        "Erreur lors de l'envoi du courriel de confirmation",
      );
    }
  }
}
