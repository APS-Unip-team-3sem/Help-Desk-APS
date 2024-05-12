package help.desk.helpdesk.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import help.desk.helpdesk.models.Chamado.ChamadoModel;
import java.util.List;


public interface ChamadoRepository extends JpaRepository<ChamadoModel,UUID> {
    List<ChamadoModel> findByTitulo(String titulo);
}
