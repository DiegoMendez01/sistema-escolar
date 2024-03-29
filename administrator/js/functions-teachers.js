$('#tableteachers').DataTable();

var tableteachers;

document.addEventListener('DOMContentLoaded', function(){
	tableteachers = $('#tableteachers').DataTable({
		"aProcessing": true,
		"aServerSide": true,
		"language": {
			"url": "http://cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
		},
		"ajax": {
			"url": "./models/teachers/table_teachers.php",
			"dataSrc": "",
		},
		"columns": [
			{"data": "acciones"},
			{"data": "id"},
			{"data": "name"},
			{"data": "address"},
			{"data": "identification"},
			{"data": "phone"},
			{"data": "email"},
			{"data": "level"},
			{"data": "is_active"}
		],
		"responsive": true,
		"bDestroy": true,
		"iDisplayLength": 10,
		"order": [[0, "asc"]]
	});
	
	var formTeacher = document.querySelector('#formTeacher');
	formTeacher.onsubmit = function(e){
		e.preventDefault();
		
		var id            	= document.querySelector('#id').value;
		var name          	= document.querySelector('#name').value;
		var address       	= document.querySelector('#address').value;
		var identification 	= document.querySelector('#identification').value;
		var password 	    = document.querySelector('#password').value;
		var phone       	= document.querySelector('#phone').value;
		var email       	= document.querySelector('#email').value;
		var level       	= document.querySelector('#level').value;
		var is_active     	= document.querySelector('#is_active').value;
		
		if(name == '' || address == '' || identification == '' || phone == '' || email == '' || level == ''){
			Swal.fire('Atencion', 'Todos los campos son necesarios', 'error');
			return false;
		}
		
		var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		var url     = './models/teachers/ajax_teachers.php';
		var form    = new FormData(formTeacher);
		
		request.open('POST', url, true);
		request.send(form);
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				var data = JSON.parse(request.responseText);
				if(data.status){
					$('#modalTeacher').modal('hide');
					Swal.fire('Profesor', data.msg, 'success');
					formTeacher.reset();
					tableteachers.ajax.reload();
				}else{
					Swal.fire('Atencion', data.msg, 'error');
				}
			}
		}
	}
});

function openModalTeacher()
{
	document.querySelector('#id').value = '';
	document.querySelector('#tituloModal').innerHTML = 'Nuevo Profesor';
	document.querySelector('#action').innerHTML = 'Guardar';
	document.querySelector('#formTeacher').reset();
	$('#modalTeacher').modal('show');
}

function editTeacher(id)
{
	var idTeacher = id;
	
	document.querySelector('#tituloModal').innerHTML = 'Actualizar Profesor';
	document.querySelector('#action').innerHTML = 'Actualizar';
	
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	var url     = './models/teachers/edit_teachers.php?id='+idTeacher;
	
	request.open('GET', url, true);
	request.send();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var data = JSON.parse(request.responseText);
			if(data.status){
				document.querySelector('#id').value = data.data.id;
				document.querySelector('#name').value = data.data.name;
				document.querySelector('#address').value = data.data.address;
				document.querySelector('#identification').value = data.data.identification;
				document.querySelector('#phone').value = data.data.phone;
				document.querySelector('#email').value = data.data.email;
				document.querySelector('#level').value = data.data.level;
				document.querySelector('#is_active').value = data.data.is_active;
				
				$('#modalTeacher').modal('show');
			}else{
				Swal.fire('Atencion', data.msg, 'error');
			}
		}
	}
}

function deleteTeacher(id)
{
	var idTeacher = id;
	
	Swal.fire({
		title: "Eliminar Profesor",
		text: "¿Realmente desea eliminar el profesor?",
		showDenyButton: true,
		confirmButtonText: "Si, eliminar",
		denyButtonText: `No, cancelar`
	}).then((result) => {
		if(result.isConfirmed){
			var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			var url = './models/teachers/delete_teachers.php';
			
			request.open('POST', url, true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // Configurar los encabezados antes de enviar
			var strData = "id=" + idTeacher;
			request.send(strData);
			request.onreadystatechange = function () {
			    if (request.readyState == 4 && request.status == 200) {
			        var data = JSON.parse(request.responseText);
			        if (data.status) {
			            Swal.fire('Eliminar', data.msg, 'success');
			            tableteachers.ajax.reload();
			        } else {
			            Swal.fire('Atencion', data.msg, 'error');
			        }
			    }
			};
		}
	});
}