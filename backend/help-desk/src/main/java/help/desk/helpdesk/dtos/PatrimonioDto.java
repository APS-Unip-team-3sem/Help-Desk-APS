    package help.desk.helpdesk.dtos;

import jakarta.validation.constraints.NotBlank;


public record PatrimonioDto(@NotBlank String nome_descricao,String CNPJ,String logradouro
,String cep
,String num) {}
