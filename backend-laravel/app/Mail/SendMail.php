<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $posiljalac;
    public $primalac;
    public $template;

    public function __construct($posiljalac,$primalac,$template,$nazivRoditelja,$korisnickoIme,$lozinka)
    {
        $this->posiljalac = $posiljalac;
        $this->primalac = $primalac;
        $this->template = $template;
        $this->nazivRoditelja = $nazivRoditelja;
        $this->korisnickoIme = $korisnickoIme;
        $this->lozinka = $lozinka;

    }

    public function build()
    {
        // return $this->from($this->posiljalac)
        //     ->view($this->template)
        //     ->with(['primalac' => $this->primalac]);

        // return $this->from($this->posiljalac)
        return $this->from('marija.nikolic1513@gmail.com')
            ->view('emails.proba')
            ->with([
            'nazivRoditelja' => $this->nazivRoditelja,
            'korisnickoIme' => $this->korisnickoIme,
            'lozinka' => $this->lozinka,
        ]);
    }

    /**
     * Get the message envelope.
     */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Send Mail',
    //     );
    // }

    /**
     * Get the message content definition.
     */
    /*public function content(): Content
    {
        return new Content(
            view: 'view.name',
        );
    }*/

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    // public function attachments(): array
    // {
    //     return [];
    // }
}
