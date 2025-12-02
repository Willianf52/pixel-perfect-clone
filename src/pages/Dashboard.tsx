import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, LogOut, BookOpen, Calendar, Users, Settings } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      } else {
        // Fetch profile after session is confirmed
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setProfile(data as Profile);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const roleLabels = {
    student: "Aluno",
    teacher: "Professor",
    admin: "Administrador",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ClassHub</h1>
              <p className="text-xs text-muted-foreground">{profile?.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Bem-vindo, {profile?.name}!
          </h2>
          <p className="text-muted-foreground">
            Conta: <span className="font-medium text-foreground">{roleLabels[profile?.role || "student"]}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile?.role === "admin" && (
            <>
              <Card className="hover:shadow-lg transition-all cursor-pointer border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Gerenciar Usuários</CardTitle>
                  <CardDescription>
                    Cadastrar e gerenciar alunos e professores
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Matérias</CardTitle>
                  <CardDescription>
                    Cadastrar e gerenciar matérias do sistema
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-2">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>Horários</CardTitle>
                  <CardDescription>
                    Configurar horários e dias das aulas
                  </CardDescription>
                </CardHeader>
              </Card>
            </>
          )}

          {profile?.role === "teacher" && (
            <>
              <Card className="hover:shadow-lg transition-all cursor-pointer border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Minhas Turmas</CardTitle>
                  <CardDescription>
                    Criar e gerenciar suas turmas
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Matérias</CardTitle>
                  <CardDescription>
                    Ver matérias disponíveis
                  </CardDescription>
                </CardHeader>
              </Card>
            </>
          )}

          {profile?.role === "student" && (
            <>
              <Card className="hover:shadow-lg transition-all cursor-pointer border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Turmas Disponíveis</CardTitle>
                  <CardDescription>
                    Ver todas as turmas e se inscrever
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all cursor-pointer border-0" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Minhas Inscrições</CardTitle>
                  <CardDescription>
                    Ver turmas que você está inscrito
                  </CardDescription>
                </CardHeader>
              </Card>
            </>
          )}
        </div>

        <Card className="mt-8 border-0" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <CardTitle>Bem-vindo ao ClassHub!</CardTitle>
            <CardDescription>
              Sistema completo de gerenciamento de turmas acadêmicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Este sistema permite a administração completa de turmas, com funcionalidades específicas para cada tipo de usuário:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Administradores</strong> podem cadastrar alunos, professores, matérias, horários e gerenciar todo o sistema</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span><strong>Professores</strong> podem selecionar matérias e criar turmas com horários específicos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span>
                <span><strong>Alunos</strong> podem visualizar todas as turmas disponíveis e se inscrever nelas</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;