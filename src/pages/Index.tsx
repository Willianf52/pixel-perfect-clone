import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ClassHub
            </span>
          </div>
          <Link to="/auth">
            <Button variant="outline">Entrar</Button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Content */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
              Gestão de Turmas
              <br />
              Simplificada
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sistema completo para gerenciar alunos, professores, matérias e horários.
              Tudo que você precisa em um só lugar.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Começar Agora
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
            <p className="text-muted-foreground">Ferramentas poderosas para cada tipo de usuário</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-0 hover:shadow-lg transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <CardTitle>Para Administradores</CardTitle>
                <CardDescription>
                  Controle total do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Cadastrar alunos e professores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Gerenciar matérias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Configurar horários</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 hover:shadow-lg transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <CardTitle>Para Professores</CardTitle>
                <CardDescription>
                  Gerencie suas turmas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Selecionar matérias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Criar turmas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Ver alunos inscritos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 hover:shadow-lg transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center mb-4">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <CardTitle>Para Alunos</CardTitle>
                <CardDescription>
                  Organize seus estudos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Ver turmas disponíveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Se inscrever em turmas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Acompanhar horários</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <Card className="max-w-2xl mx-auto border-0" style={{ boxShadow: "var(--shadow-elevated)" }}>
            <CardHeader>
              <CardTitle className="text-3xl">Pronto para começar?</CardTitle>
              <CardDescription className="text-lg">
                Crie sua conta gratuitamente e comece a gerenciar suas turmas hoje mesmo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Criar Conta Grátis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ClassHub. Sistema de Gerenciamento de Turmas.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;