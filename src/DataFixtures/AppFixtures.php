<?php

namespace App\DataFixtures;

use App\Entity\Depenses;
use App\Entity\Mission;
use App\Entity\Missionnaire;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    /**
     *@var UserPasswordHasherInterface
     */
    private $encoder;
    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        for ($i = 0; $i < 5; $i++) {
            $user = new Missionnaire();
            $hash = $this->encoder->hashPassword($user, "password");
            $user->setNom($faker->name)
                ->setPrenom($faker->firstName)
                ->setFonction($faker->company)
                ->setEmail($faker->email)
                ->setPassword($hash);

            $manager->persist($user);
            for ($k = 0; $k < mt_rand(2, 10); $k++) {
                $depense = new Depenses();
                $depense->setDesignation($faker->text(10))
                    ->setPrixUnitaire($faker->randomFloat(2, 150, 5000))
                    ->setQuantite($faker->randomFloat(2, 5, 10));
                $manager->persist($depense);

                for ($m = 0; $m < 1; $m++) {
                    $mission = new Mission();
                    $mission->setObjectif($faker->text())
                        ->setDateMission($faker->dateTimeBetween('-1 months'))
                        ->setDestination($faker->country)
                        ->setLieuIntervation($faker->country)
                        ->setCoordonneGps($faker->longitude)
                        ->setContexte($faker->text(50))
                        ->setDeroulement($faker->text(90))
                        ->setAutreActivite($faker->text(30))
                        ->setDifficulte($faker->text(30))
                        ->setSuggestion($faker->text(30))
                        ->setDepenses($depense)
                        ->setMissionnaire($user);
                    $manager->persist($mission);
                }
            }
        }
        $manager->flush();
    }
}
