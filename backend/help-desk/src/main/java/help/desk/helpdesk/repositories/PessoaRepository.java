package help.desk.helpdesk.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import help.desk.helpdesk.models.PessoaModel;

public interface PessoaRepository extends JpaRepository<PessoaModel, UUID> {

}
