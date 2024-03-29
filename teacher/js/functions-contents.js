document.addEventListener('DOMContentLoaded', function(){
	var formContent = document.querySelector('#formContent');
	formContent.onsubmit = function(e){
		e.preventDefault();
		
		var id          = document.querySelector('#id').value;
		var title       = document.querySelector('#title').value;
		var description = document.querySelector('#description').value;
		var material    = document.querySelector('#material').value;
		
		if(title == '' || description == ''){
			Swal.fire('Atencion', 'Todos los campos son necesarios', 'error');
			return false;
		}
		
		var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		var url     = './models/contents/ajax_contents.php';
		var form    = new FormData(formContent);
		
		request.open('POST', url, true);
		request.send(form);
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				var data = JSON.parse(request.responseText);
				Swal.fire({
					title: "Crear/Actualizar contenido",
					showDenyButton: true,
					confirmButtonText: "Aceptar",
				}).then((result) => {
					if(result.isConfirmed){
						if(data.status){
							$('#modalContent').modal('hide');
							location.reload();
							formContent.reset();
						}else{
							Swal.fire('Atencion', data.msg, 'error');
						}
					}
				});
			}
		}
	}
})

function openModalContent()
{
	document.querySelector('#id').value = '';
	document.querySelector('#tituloModal').value = 'Nuevo Contenido';
	document.querySelector('#action').innerHTML = 'Guardar';
	document.querySelector('#formContent').reset();
	$('#modalContent').modal('show');
}

function editContent(id)
{
	idContent = id;
	
	document.querySelector('#tituloModal').value = 'Actualizar Contenido';
	document.querySelector('#action').innerHTML = 'Actualizar';
	
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	var url     = './models/contents/edit_contents.php?id='+idContent;
	request.open('GET', url, true);
	request.send();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var data = JSON.parse(request.responseText);
			if(data.status){
				document.querySelector('#id').value = data.data.id;
				document.querySelector('#title').value = data.data.title;
				document.querySelector('#description').value = data.data.description;
				//document.querySelector('#material').value = data.data.material;
				
				$('#modalContent').modal('show');
			}else{
				Swal.fire('Atencion', data.msg, 'error');
			}
		}
	}
}

function deleteContent(id)
{
	var idContent = id;
	
	Swal.fire({
		title: "Eliminar Contenido",
		text: "¿Realmente desea eliminar el contenido?",
		showDenyButton: true,
		confirmButtonText: "Si, eliminar",
		denyButtonText: `No, cancelar`
	}).then((result) => {
		if(result.isConfirmed){
			var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
			var url     = './models/contents/delete_contents.php';
			
			request.open('POST', url, true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // Configurar los encabezados antes de enviar
			var strData = "id=" + idContent;
			request.send(strData);
			request.onreadystatechange = function () {
			    if (request.readyState == 4 && request.status == 200) {
			        var data = JSON.parse(request.responseText);
			        if (data.status) {
			            location.reload();
			        }else{
			            Swal.fire('Atencion', data.msg, 'error');
			        }
			    }
			};
		}
	});
}