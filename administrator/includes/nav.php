<!-- Sidebar menu-->
<div class="app-sidebar__overlay" data-toggle="sidebar"></div>
<aside class="app-sidebar">
  <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User Image">
    <div>
      <p class="app-sidebar__user-name"><?php echo $_SESSION['name']; ?></p>
      <p class="app-sidebar__user-designation"><?php echo $_SESSION['role']; ?></p>
    </div>
  </div>
  <ul class="app-menu">
    <li><a class="app-menu__item" href="list_users.php"><i class="app-menu__icon fas fa-user"></i><span
    class="app-menu__label">Usuarios</span></a></li>
    <li><a class="app-menu__item" href="list_teachers.php"><i class="app-menu__icon fas fa-chalkboard-teacher"></i><span
    class="app-menu__label">Profesores</span></a></li>
    <li><a class="app-menu__item" href="list_students.php"><i class="app-menu__icon fas fa-user-graduate"></i><span
    class="app-menu__label">Alumnos</span></a></li>
    <li><a class="app-menu__item" href="list_degrees.php"><i class="app-menu__icon fas fa-list-alt"></i><span
    class="app-menu__label">Grados</span></a></li>
    <li><a class="app-menu__item" href="list_classrooms.php"><i class="app-menu__icon fas fa-list-alt"></i><span
    class="app-menu__label">Aulas</span></a></li>
    <li><a class="app-menu__item" href="list_courses.php"><i class="app-menu__icon fas fa-list-alt"></i><span
    class="app-menu__label">Materias</span></a></li>
    <li><a class="app-menu__item" href="list_periods.php"><i class="app-menu__icon fas fa-list-alt"></i><span
    class="app-menu__label">Periodos</span></a></li>
    <li><a class="app-menu__item" href="list_activities.php"><i class="app-menu__icon fas fa-list-alt"></i><span
    class="app-menu__label">Actividades</span></a></li>
    <li><a class="app-menu__item" href="list_teacher_courses.php"><i class="app-menu__icon fas fa-list-alt"></i><span
    class="app-menu__label">Materias Profesor</span></a></li>
    <li><a class="app-menu__item" href="list_student_teachers.php"><i class="app-menu__icon fas fa-list-alt"></i><span
    class="app-menu__label">Alumnos Profesor</span></a></li>
    <li><a class="app-menu__item" href="../logout.php"><i class="app-menu__icon fas fa-sign-out-alt"></i><span
    class="app-menu__label">Logout</span></a></li>
  </ul>
</aside>