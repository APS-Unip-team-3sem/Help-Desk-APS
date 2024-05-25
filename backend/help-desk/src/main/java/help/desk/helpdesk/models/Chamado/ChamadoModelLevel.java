package help.desk.helpdesk.models.Chamado;

import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;
import help.desk.helpdesk.models.Usuario.UsuarioModel;
import help.desk.helpdesk.models.Usuario.TipoUsuario;

@Entity(name = "ChamadoLevel") 
@Table(name = "ChamadoLevel")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ChamadoLevelId.class)
public class ChamadoModelLevel{

    @Id
    private UUID id;

    @Id
    private int sequencia;

    @ManyToOne
    @JoinColumn(name = "id_usuario",nullable = false)
    private UsuarioModel usuarioModel;

    private TipoUsuario tipousuario;

    @Column(columnDefinition = "timestamp")
    private Date data;

    @Column(columnDefinition = "Text")
    private String observacao;

}