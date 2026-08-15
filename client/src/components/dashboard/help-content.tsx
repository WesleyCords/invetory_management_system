"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Check,
  ChevronDown,
  Bug,
  Lightbulb,
  CircleHelp,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const DEV_EMAIL = "wesley.cordeiro1@icloud.com";

const categories = [
  { value: "bug", label: "Reportar um bug", icon: Bug },
  { value: "feature", label: "Sugerir melhoria", icon: Lightbulb },
  { value: "question", label: "Duvida sobre o sistema", icon: CircleHelp },
  { value: "other", label: "Outro assunto", icon: MessageSquare },
];

const faqs = [
  {
    question: "Como registro uma entrada ou saida de produto?",
    answer:
      "Acesse a aba Movimentacoes no menu lateral, clique em 'Nova Movimentacao', escolha o tipo (entrada ou saida), selecione o produto e informe a quantidade.",
  },
  {
    question: "O que significa o alerta de estoque baixo?",
    answer:
      "Cada produto possui um estoque minimo configurado. Quando a quantidade atual fica abaixo desse valor, o sistema exibe um alerta na Visao Geral para voce repor o produto.",
  },
  {
    question: "Como adiciono varios fornecedores a um produto?",
    answer:
      "Na aba Produtos, abra o menu de acoes do produto e clique em Editar. Na secao Fornecedores, digite o nome e pressione Enter para adicionar. Clique no X de um chip para remover.",
  },
  {
    question: "Onde vejo quem fez cada movimentacao?",
    answer:
      "A aba Logs mostra o historico completo de atividades, agrupado por data, com o nome do responsavel por cada acao realizada no sistema.",
  },
];

export function HelpContent() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("question");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabel =
      categories.find((c) => c.value === category)?.label ?? category;
    const fullSubject = `[Sistema de Gerenciamento de Estoque][${categoryLabel}] ${subject}`;
    const body = `Categoria: ${categoryLabel}\n\n${message}\n\n---\nEnviado pela Central de Ajuda do Sistema de Gerenciamento de Estoque.`;

    const mailtoUrl = `mailto:${DEV_EMAIL}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Central de Ajuda</h1>
        <p className="text-sm text-muted-foreground">
          Encontre respostas rapidas ou fale diretamente com o desenvolvedor do
          sistema
        </p>
      </div>

      <Card className="border-border bg-card p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Fale com o desenvolvedor
            </h2>
            <p className="text-sm text-muted-foreground">
              Sua mensagem sera enviada para{" "}
              <span className="text-foreground">{DEV_EMAIL}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">
                Categoria
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className="bg-secondary border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <cat.icon className="h-4 w-4" />
                        {cat.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-foreground">
                Assunto
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Resumo do que voce precisa"
                className="bg-secondary border-border"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Mensagem
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Descreva em detalhes sua duvida, problema ou sugestao..."
              className="min-h-32 bg-secondary border-border"
              required
            />
            <p className="text-xs text-muted-foreground">
              Se for um bug, descreva o que voce fez, o que esperava e o que
              aconteceu.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            {sent && (
              <span className="flex items-center gap-1 text-sm text-primary">
                <Check className="h-4 w-4" />
                Abrindo seu email...
              </span>
            )}
            <Button type="submit" disabled={!subject.trim() || !message.trim()}>
              <Send className="h-4 w-4" />
              Enviar email
            </Button>
          </div>
        </form>
      </Card>

      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Perguntas frequentes
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <Card
                key={faq.question}
                className="gap-0 overflow-hidden border-border bg-card p-0 hover:bg-secondary/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </motion.div>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
