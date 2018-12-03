Create Database desafiopd;
use desafiopd;
CREATE TABLE IF NOT EXISTS `colecao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` text NOT NULL,
  `descricao` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `disco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_album` text NOT NULL,
  `ano_lancamento` varchar(10),
  `genero` text,
  `image` text,
  `gravadora` text ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `item_colecao` (
  `colecaoId` int NOT NULL,
  `discoId` int NOT NULL,
  foreign key (`colecaoId`) references colecao(id),
  foreign key (`discoId`) references disco(id)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;