-- CreateTable
CREATE TABLE `profesionales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `registro_profesional` VARCHAR(191) NOT NULL,
    `especialidad` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `agenda_habilitada` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `profesionales_registro_profesional_key`(`registro_profesional`),
    UNIQUE INDEX `profesionales_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
