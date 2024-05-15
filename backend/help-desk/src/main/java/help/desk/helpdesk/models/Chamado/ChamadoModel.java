package help.desk.helpdesk.models.Chamado;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import help.desk.helpdesk.models.PatrimonioModel;
import help.desk.helpdesk.models.Usuario.UsuarioModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "chamado")
@Table(name = "chamado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChamadoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, columnDefinition = "VARCHAR(100)")
    private String titulo;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false,columnDefinition = "timestamp")
    private Date abertura;

    @Column(columnDefinition = "timestamp")
    private Date fechamento;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private StatusChamado statusChamado;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private PrioridadeChamado prioridadeChamado;

    @ManyToOne
    @JoinColumn(name = "id_patrimonio")
    private PatrimonioModel patrimonioModel;

    @ManyToOne
    @JoinColumn(name = "id_usuario",nullable = false)
    private UsuarioModel usuarioModel;
    
    @ManyToOne
    @JoinColumn(name = "id_resposavel")
    private UsuarioModel usuarioModelResponsavel;

    public ChamadoModel(String titulo, String descricao, PrioridadeChamado prioridade, Date abertura, UsuarioModel usuarioModel, PatrimonioModel patrimonioModel){
        this.titulo = titulo;
        this.descricao = descricao;
        this.abertura = abertura;
        this.statusChamado = StatusChamado.ABERTO;
        this.prioridadeChamado = prioridade;
        this.usuarioModel = usuarioModel;
        this.patrimonioModel = patrimonioModel;
    }

    public ChamadoModel(UUID id, String titulo, String descricao, PrioridadeChamado prioridade, Date abertura, StatusChamado statusChamado, PatrimonioModel patrimonioModel, UsuarioModel usuarioModel){
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.abertura = abertura;
        this.statusChamado = statusChamado;
        this.prioridadeChamado = prioridade;
        this.usuarioModel = usuarioModel;
        this.patrimonioModel = patrimonioModel;
    }

    public void setNull(){
        this.abertura= null;
        this.descricao= null;
        this.fechamento= null;
        this.id= null;
        this.prioridadeChamado= null;
        this.statusChamado= null;
        this.titulo= null;
        this.usuarioModel= null;
        this.usuarioModelResponsavel= null;
        this.patrimonioModel = null;
    }

    public ChamadoModel(Optional<ChamadoModel> chamado){
        chamado.map(chamadoFinal -> {
            this.id =  chamadoFinal.getId();
            this.titulo =  chamadoFinal.getTitulo();
            this.descricao =  chamadoFinal.getDescricao();
            this.usuarioModel =  chamadoFinal.getUsuarioModel();
            this.usuarioModelResponsavel =  chamadoFinal.getUsuarioModelResponsavel();
            this.abertura =  chamadoFinal.getAbertura();
            this.prioridadeChamado =  chamadoFinal.getPrioridadeChamado();
            this.fechamento =  chamadoFinal.getFechamento();
            this.statusChamado = chamadoFinal.getStatusChamado();
            this.patrimonioModel = chamadoFinal.getPatrimonioModel();
            return null;
        });
    }

    public ChamadoModel(ChamadoModel chamado){
        this(chamado.getId(), chamado.getTitulo(),chamado.getDescricao(),chamado.getPrioridadeChamado(),chamado.getAbertura(),chamado.getStatusChamado(),chamado.getPatrimonioModel(),chamado.getUsuarioModel());
    }
}
