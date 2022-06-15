<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220614124902 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mission ADD depenses_id INT NOT NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C338B55D2 FOREIGN KEY (depenses_id) REFERENCES depenses (id)');
        $this->addSql('CREATE INDEX IDX_9067F23C338B55D2 ON mission (depenses_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23C338B55D2');
        $this->addSql('DROP INDEX IDX_9067F23C338B55D2 ON mission');
        $this->addSql('ALTER TABLE mission DROP depenses_id');
    }
}
