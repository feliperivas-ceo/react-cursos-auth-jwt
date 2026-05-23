import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { request } from "../api/client";
import { useAuth } from "../auth/useAuth";

function CoursesPage() {
  const { logout } = useAuth();

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    code: "",
    credits: "",
    teacherId: "2",
  });

  const loadCourses = useCallback(async () => {
  try {
    const data = await request("/api/courses");
    setCourses(data);
  } catch (err) {
    console.error(err);
    setError("No se pudieron cargar los cursos");
  }
}, []);

useEffect(() => {
  async function cargarCursos() {
    try {
      const data = await request("/api/courses");
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los cursos");
    }
  }

  cargarCursos();
}, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await request("/api/courses", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          code: form.code,
          credits: Number(form.credits),
          teacherId: Number(form.teacherId),
        }),
      });

      setSuccess("Curso creado correctamente");

      setForm({
        name: "",
        description: "",
        code: "",
        credits: "",
        teacherId: "2",
      });

      await loadCourses();
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el curso");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Gestión de cursos</Typography>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Crear curso
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  name="name"
                  fullWidth
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Código"
                  name="code"
                  fullWidth
                  required
                  value={form.code}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Descripción"
                  name="description"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Créditos"
                  name="credits"
                  type="number"
                  fullWidth
                  required
                  value={form.credits}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="ID del profesor"
                  name="teacherId"
                  type="number"
                  fullWidth
                  required
                  value={form.teacherId}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Crear curso"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Cursos registrados
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {courses.length === 0 ? (
        <Typography color="text.secondary">
          No hay cursos registrados todavía.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} key={course.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course.name}</Typography>

                  <Typography color="text.secondary" gutterBottom>
                    Código: {course.code} | Créditos: {course.credits}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {course.description}
                  </Typography>

                  <Typography variant="body2">
                    Profesor: {course.teacher?.name || "Sin profesor"}
                  </Typography>

                  <Typography variant="body2">
                    Estudiantes: {course.students?.length || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default CoursesPage;