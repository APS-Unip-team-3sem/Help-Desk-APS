package help.desk.helpdesk.repositories;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import help.desk.helpdesk.models.Chamado.ChamadoModelLevel;

public interface ChamadoLevelRepository extends JpaRepository<ChamadoModelLevel, UUID>{
    public List<ChamadoModelLevel> findByIdOrderBySequenciaAsc(UUID id);
    public Optional<ChamadoModelLevel> findFirstByIdOrderBySequenciaDesc(UUID id);
}
