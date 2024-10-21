"use client"

import { ICoder } from "@/models/coders/coder.model"
import { CoderService } from "@/services/coders.service"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const initialForm: ICoder = {
    id: "",
    name: "",
    avatar: "https://picsum.photos/200",
    createAt: new Date().toISOString()
}

interface CodersFormProps {
    selectedCoder: ICoder | null;
    setSelectedCoder: (coder: ICoder | null) => void;
}

const CodersForm: React.FC<CodersFormProps> = ({ selectedCoder, setSelectedCoder }) => {
    const [newCoder, setNewCoder] = useState<ICoder>(initialForm);
    const userCoderService = new CoderService()
    const router = useRouter()

    useEffect(() => {
        if (selectedCoder) {
            setNewCoder(selectedCoder); // Cargar datos del coder seleccionado para edición
        } else {
            setNewCoder(initialForm); // Reiniciar formulario si no hay selección
        }
    }, [selectedCoder])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCoder({ ...newCoder, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCoder) {
            await userCoderService.update(newCoder.id, newCoder); // Actualizar coder
            setSelectedCoder(null); // Limpiar selección después de la edición
        } else {
            await userCoderService.create(newCoder); // Crear nuevo coder
        }
        router.refresh();
        setNewCoder(initialForm); // Reiniciar formulario
    }

    return (
        <div className="container-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newCoder.name}
                    placeholder="Nombre"
                    onChange={handleChange}
                    required
                />
                <button type="submit">
                    {selectedCoder ? "Actualizar Coder" : "Crear Coder"}
                </button>
            </form>
        </div>
    )
}

export default CodersForm;
