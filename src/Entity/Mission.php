<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MissionRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: MissionRepository::class)]
/**
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"missions_read"}
 *  }
 * )
 */
/**
 * @ApiResource(
 *  attributes={
 *      "order": {"date_mission":"desc"}
 *  }
 * )
 */
class mission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $objectif;

    #[ORM\Column(type: 'datetime')]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $date_mission;

    #[ORM\Column(type: 'string', length: 255)]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $destination;

    #[ORM\Column(type: 'string', length: 255)]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $lieu_intervation;

    #[ORM\Column(type: 'string', length: 255)]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $coordonne_gps;

    #[ORM\Column(type: 'string', length: 255)]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $contexte;

    #[ORM\Column(type: 'string', length: 255)]
    /**
     * @Groups({"missions_read","missionnaire_read"})
     */
    private $deroulement;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $autre_activite;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $difficulte;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $suggestion;

    #[ORM\ManyToOne(targetEntity: Depenses::class, inversedBy: 'depense')]
    #[ORM\JoinColumn(nullable: false)]
    /**
     * @Groups({"missions_read"})
     */
    private $depenses;

    #[ORM\ManyToOne(targetEntity: Missionnaire::class, inversedBy: 'mission')]
    /**
     * @Groups({"missions_read"})
     */
    private $missionnaire;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $remarque;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getObjectif(): ?string
    {
        return $this->objectif;
    }

    public function setObjectif(string $objectif): self
    {
        $this->objectif = $objectif;

        return $this;
    }

    public function getDateMission(): ?\DateTimeInterface
    {
        return $this->date_mission;
    }

    public function setDateMission(\DateTimeInterface $date_mission): self
    {
        $this->date_mission = $date_mission;

        return $this;
    }

    public function getDestination(): ?string
    {
        return $this->destination;
    }

    public function setDestination(string $destination): self
    {
        $this->destination = $destination;

        return $this;
    }

    public function getLieuIntervation(): ?string
    {
        return $this->lieu_intervation;
    }

    public function setLieuIntervation(string $lieu_intervation): self
    {
        $this->lieu_intervation = $lieu_intervation;

        return $this;
    }

    public function getCoordonneGps(): ?string
    {
        return $this->coordonne_gps;
    }

    public function setCoordonneGps(string $coordonne_gps): self
    {
        $this->coordonne_gps = $coordonne_gps;

        return $this;
    }

    public function getContexte(): ?string
    {
        return $this->contexte;
    }

    public function setContexte(string $contexte): self
    {
        $this->contexte = $contexte;

        return $this;
    }

    public function getDeroulement(): ?string
    {
        return $this->deroulement;
    }

    public function setDeroulement(string $deroulement): self
    {
        $this->deroulement = $deroulement;

        return $this;
    }

    public function getAutreActivite(): ?string
    {
        return $this->autre_activite;
    }

    public function setAutreActivite(?string $autre_activite): self
    {
        $this->autre_activite = $autre_activite;

        return $this;
    }

    public function getDifficulte(): ?string
    {
        return $this->difficulte;
    }

    public function setDifficulte(?string $difficulte): self
    {
        $this->difficulte = $difficulte;

        return $this;
    }

    public function getSuggestion(): ?string
    {
        return $this->suggestion;
    }

    public function setSuggestion(?string $suggestion): self
    {
        $this->suggestion = $suggestion;

        return $this;
    }

    public function getDepenses(): ?Depenses
    {
        return $this->depenses;
    }

    public function setDepenses(?Depenses $depenses): self
    {
        $this->depenses = $depenses;

        return $this;
    }

    public function getMissionnaire(): ?Missionnaire
    {
        return $this->missionnaire;
    }

    public function setMissionnaire(?Missionnaire $missionnaire): self
    {
        $this->missionnaire = $missionnaire;

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
