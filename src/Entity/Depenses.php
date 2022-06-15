<?php

namespace App\Entity;

use App\Repository\DepensesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DepensesRepository::class)]
class Depenses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $designation;

    #[ORM\Column(type: 'float')]
    private $prix_unitaire;

    #[ORM\Column(type: 'float')]
    private $quantite;

    #[ORM\OneToMany(mappedBy: 'depenses', targetEntity: mission::class)]
    private $depense;

    public function __construct()
    {
        $this->depense = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDesignation(): ?string
    {
        return $this->designation;
    }

    public function setDesignation(string $designation): self
    {
        $this->designation = $designation;

        return $this;
    }

    public function getPrixUnitaire(): ?float
    {
        return $this->prix_unitaire;
    }

    public function setPrixUnitaire(float $prix_unitaire): self
    {
        $this->prix_unitaire = $prix_unitaire;

        return $this;
    }

    public function getQuantite(): ?float
    {
        return $this->quantite;
    }

    public function setQuantite(float $quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }

    /**
     * @return Collection<int, mission>
     */
    public function getDepense(): Collection
    {
        return $this->depense;
    }

    public function addDepense(mission $depense): self
    {
        if (!$this->depense->contains($depense)) {
            $this->depense[] = $depense;
            $depense->setDepenses($this);
        }

        return $this;
    }

    public function removeDepense(mission $depense): self
    {
        if ($this->depense->removeElement($depense)) {
            // set the owning side to null (unless already changed)
            if ($depense->getDepenses() === $this) {
                $depense->setDepenses(null);
            }
        }

        return $this;
    }
}
