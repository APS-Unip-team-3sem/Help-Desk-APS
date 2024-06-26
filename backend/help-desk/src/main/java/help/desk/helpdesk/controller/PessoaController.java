package help.desk.helpdesk.controller;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import help.desk.helpdesk.dtos.PessoaDto;
import help.desk.helpdesk.models.PessoaModel;
import help.desk.helpdesk.repositories.PessoaRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("pessoas")
public class PessoaController {
	
	@Autowired
	PessoaRepository pessoaRepository;

	// POST (Create)
	@PostMapping("")
	public ResponseEntity<PessoaModel> saveProduct(@RequestBody @Valid PessoaDto pessoaDto) {
		// popular campos do model com dados recebidos no DTO
		PessoaModel pessoaModel = new PessoaModel();
		BeanUtils.copyProperties(pessoaDto, pessoaModel); // conversão do objeto DTO para objeto do model
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaRepository.save(pessoaModel)); 															
	}
	
	//GET ALL (read)
	@GetMapping("")
	public ResponseEntity<List<PessoaModel>> getAllPessoas() {
		return ResponseEntity.status(HttpStatus.OK).body(pessoaRepository.findAll());
	}
	
	//GET ONE
	@GetMapping("/{id}")
	public ResponseEntity<Object> getOneProduct(@PathVariable(value="id") UUID id){
		Optional<PessoaModel> pessoa = pessoaRepository.findById(id);
		if(pessoa.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(pessoa.get());
	}
	
	//PUT
	@PutMapping("/{id}")
	public ResponseEntity<Object> updateProduct(@PathVariable(value = "id") UUID id, @RequestBody @Valid PessoaDto pessoaDto) {
		Optional<PessoaModel> pessoa = pessoaRepository.findById(id);
		if (pessoa.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
		}
		PessoaModel pessoaModel = pessoa.get();
		BeanUtils.copyProperties(pessoaDto, pessoaModel);
		return ResponseEntity.status(HttpStatus.OK).body(pessoaRepository.save(pessoaModel));
	}
	
	//DELETE
	@DeleteMapping("/{id}")  // removendo "/products" para corrigir o endpoint
	public ResponseEntity<Object> deleteProduct(@PathVariable(value="id") UUID id) {
		Optional<PessoaModel> pessoa = pessoaRepository.findById(id);
		if(pessoa.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
		}
		pessoaRepository.delete(pessoa.get());
		return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully.");
	}

}
