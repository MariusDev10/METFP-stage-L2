<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\RapportRepository;
use ApiPlatform\Core\Annotation\ApiResource;

#[ORM\Entity(repositoryClass: RapportRepository::class)]
/**
 * @ApiResource
 */
class Rapport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime')]
    private $date_rapport;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $remarque;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateRapport(): ?\DateTimeInterface
    {
        return $this->date_rapport;
    }

    public function setDateRapport(\DateTimeInterface $date_rapport): self
    {
        $this->date_rapport = $date_rapport;

        return $this;
    }

    public function getRemarque(): ?string
    {
        return $this->remarque;
    }

    public function setRemarque(?string $remarque): self
    {
        $this->remarque = $remarque;

        return $this;
    }
}
