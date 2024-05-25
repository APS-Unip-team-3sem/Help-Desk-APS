package help.desk.helpdesk.models.Chamado;

import java.io.Serializable;
import jakarta.persistence.Embeddable;
import java.util.UUID;

@Embeddable
public class ChamadoLevelId implements Serializable {
    UUID id;
    int sequencia;
}
