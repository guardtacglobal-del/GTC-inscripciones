"use client";
import { useState, useEffect } from 'react';

export default function Inscripcion() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre_completo: '', fecha_nacimiento: '', edad: 0, es_menor: false,
    telefono: '', correo: '', peso: '', tutor_nombre: '', tutor_telefono: '',
    tutor_correo: '', emergencia_nombre: '', emergencia_parentesco: '',
    emergencia_telefono: '', condicion_medica: '', paquete: '', horario: '',
    fecha_inicio: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (formData.fecha_nacimiento) {
      const dob = new Date(formData.fecha_nacimiento);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
      }
      
      let paquete = '';
      let horario = '';
      if (age >= 5 && age <= 10) {
        paquete = 'Clase de niños (5–10 años) — $35/mes';
        horario = 'Sábados, 9:00–10:00 am';
      } else if (age >= 11) {
        paquete = 'Clase de adolescentes y adultos (11 años en adelante) — $35/mes';
        horario = 'Sábados, 10:00–11:00 am';
      }

      setFormData(prev => ({ ...prev, edad: age, es_menor: age < 18, paquete, horario }));
    }
  }, [formData.fecha_nacimiento]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inscripcion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      alert("Error al enviar");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) return <div className="p-10 text-center text-2xl font-bold text-blue-600">¡Inscripción exitosa a GTC!</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-black text-blue-600 mb-4">Inscripción GTC</h1>
        
        <div className="space-y-4">
          <input type="text" name="nombre_completo" onChange={handleChange} placeholder="Nombre Completo" className="w-full border p-3 rounded-lg" />
          <input type="date" name="fecha_nacimiento" onChange={handleChange} className="w-full border p-3 rounded-lg" />
          {formData.fecha_nacimiento && <p className="text-sm">Edad: {formData.edad} años</p>}
          <input type="tel" name="telefono" onChange={handleChange} placeholder="Teléfono" className="w-full border p-3 rounded-lg" />
          <input type="email" name="correo" onChange={handleChange} placeholder="Correo Electrónico" className="w-full border p-3 rounded-lg" />
          
          <input type="text" name="emergencia_nombre" onChange={handleChange} placeholder="Contacto Emergencia (Nombre)" className="w-full border p-3 rounded-lg" />
          <input type="text" name="emergencia_parentesco" onChange={handleChange} placeholder="Parentesco" className="w-full border p-3 rounded-lg" />
          <input type="tel" name="emergencia_telefono" onChange={handleChange} placeholder="Teléfono Emergencia" className="w-full border p-3 rounded-lg" />
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-bold">Horario asignado:</p>
            <p>{formData.horario || 'Selecciona fecha de nacimiento'}</p>
          </div>

          <button onClick={submitForm} disabled={isSubmitting || !formData.horario} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-800 disabled:opacity-50">
            {isSubmitting ? 'Enviando...' : 'Finalizar Inscripción'}
          </button>
        </div>
      </div>
    </div>
  );
}
