'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { User, Mail, Lock, Camera, Save } from 'lucide-react';
import styles from './styles.module.css';

interface ProfileData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  avatarUrl: string;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileData>({
    name: 'Daniel Zanchetta',
    email: 'danielzanchetta11@gmail.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatarUrl: '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler para upload de avatar
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler para inputs
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handler de submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simula chamada API
    setTimeout(() => {
      console.log('Dados salvos:', formData);
      setLoading(false);
      // Reset campos de senha
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setIsEditingPassword(false);
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Meu Perfil</h1>
            <p className={styles.subtitle}>Gerencie suas informações pessoais</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* Seção de Avatar */}
          <section className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarContainer}>
                {avatarPreview || formData.avatarUrl ? (
                  <img 
                    src={avatarPreview || formData.avatarUrl} 
                    alt="Avatar" 
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <User size={48} strokeWidth={1.5} />
                  </div>
                )}
                
                <button
                  type="button"
                  className={styles.avatarEditBtn}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Alterar foto"
                >
                  <Camera size={18} />
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.fileInput}
              />
            </div>

            <div className={styles.avatarInfo}>
              <h2 className={styles.userName}>{formData.name}</h2>
              <p className={styles.userEmail}>{formData.email}</p>
            </div>
          </section>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Seção de Informações Pessoais */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Pessoais</h3>

            <div className={styles.fieldsGrid}>
              
              {/* Nome */}
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  <User size={16} />
                  Nome Completo
                </label>
                <input
                  id="name"
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  <Mail size={16} />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

            </div>
          </section>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Seção de Senha */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Segurança</h3>
              {!isEditingPassword && (
                <button
                  type="button"
                  className={styles.changePasswordBtn}
                  onClick={() => setIsEditingPassword(true)}
                >
                  Alterar senha
                </button>
              )}
            </div>

            {isEditingPassword && (
              <div className={styles.fieldsGrid}>
                
                {/* Senha Atual */}
                <div className={styles.field}>
                  <label htmlFor="currentPassword" className={styles.label}>
                    <Lock size={16} />
                    Senha Atual
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    className={styles.input}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="••••••••"
                    required={isEditingPassword}
                  />
                </div>

                {/* Nova Senha */}
                <div className={styles.field}>
                  <label htmlFor="newPassword" className={styles.label}>
                    <Lock size={16} />
                    Nova Senha
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className={styles.input}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required={isEditingPassword}
                    minLength={8}
                  />
                </div>

                {/* Confirmar Senha */}
                <div className={styles.field}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    <Lock size={16} />
                    Confirmar Nova Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={styles.input}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Digite novamente"
                    required={isEditingPassword}
                  />
                </div>

              </div>
            )}
          </section>

          {/* Botões de Ação */}
          <div className={styles.actions}>
            {isEditingPassword && (
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setIsEditingPassword(false);
                  setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }));
                }}
              >
                Cancelar
              </button>
            )}

            <button
              type="submit"
              className={styles.saveBtn}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.loadingText}>Salvando...</span>
              ) : (
                <>
                  <Save size={18} />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}