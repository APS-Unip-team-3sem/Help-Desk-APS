package help.desk.helpdesk.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import help.desk.helpdesk.models.PatrimonioModel;

public interface PatrimonioRepository extends JpaRepository<PatrimonioModel, UUID>{}
