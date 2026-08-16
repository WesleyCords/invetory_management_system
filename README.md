# 📦 Nexus Dashboard - Inventory Management System

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Uma plataforma de gerenciamento inteligente projetada para controle de estoque, análise de métricas e monitoramento de atividades. O **Nexus Dashboard** oferece uma interface moderna e responsiva, com um _Back-end_ robusto e arquitetura _Serverless_.

🔗 **Live Demo:** [Acesse o Projeto Aqui](https://invetory-management-system-delta.vercel.app)

> **Test Credentials:**
>
> - **Username:** `admin`
> - **Password:** `200305`

---

## ✨ Features

- **Authentication & Security:** Login seguro com JWT e senhas criptografadas.
- **Dashboard & Analytics:** Gráficos interativos (_Charts_) e métricas em tempo real sobre movimentações e produtos.
- **Inventory Management:** CRUD completo de produtos, garantindo o controle rigoroso de entradas e saídas de estoque.
- **Activity Logs:** Registro detalhado de todas as ações dos usuários no sistema para auditoria.
- **Profile Management:** Atualização de dados e upload de _Avatares_ integrados ao Supabase Storage.

---

## 🗺️ Roadmap (Upcoming Features)

O desenvolvimento do Nexus Dashboard é contínuo. As seguintes _features_ estão planejadas para as próximas _releases_:

- [ ] **Role-Based Access Control (RBAC):** Implementação de limites de acesso baseados em perfis (ex: _Admin_, _Manager_, _Viewer_), restringindo ações críticas apenas para usuários autorizados.
- [ ] **Dynamic Entities CRUD:** Capacidade de criar e gerenciar customizadamente _Brands_ (Marcas), _Categories_ (Categorias) e _Suppliers_ (Fornecedores) diretamente pela interface.
- [ ] **Messaging Web Service Integration:** Conexão com serviços de mensageria (ex: AWS SNS, Twilio ou Webhooks) para enviar notificações automáticas (E-mail/SMS/WhatsApp) sobre produtos com estoque baixo ou movimentações suspeitas.
- [ ] **Export Reports:** Geração de relatórios de estoque e auditoria em PDF e Excel/CSV.

---

## 🛠️ Tech Stack

O projeto foi construído seguindo as melhores práticas do mercado, dividindo a aplicação em duas camadas independentes.

### Front-end

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Form Validation:** Zod
- **Hosting:** Vercel

### Back-end

- **Framework:** Node.js com Fastify
- **Language:** TypeScript
- **ORM:** Prisma (v7+)
- **Database:** PostgreSQL (_Serverless_ via Neon.tech)
- **File Storage:** Supabase Storage
- **Hosting:** Render

---

## ⚙️ Arquitetura & Cloud

Este projeto utiliza uma arquitetura moderna adaptada para _Cloud Computing_:

- **Connection Pooling:** Configurado via Prisma Adapter e Neon para suportar milhares de conexões simultâneas.
- **Separation of Concerns (SoC):** _Controllers_, _Services_ e _Routes_ isolados no _Back-end_ seguindo princípios da _Clean Architecture_.
- **Edge Computing:** O _Front-end_ utiliza o poder do Next.js hospedado na Vercel para roteamento rápido e _Server-Side Rendering_ quando necessário.

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js (v18+)
- pnpm (Package Manager)
- Uma conta no Neon.tech e Supabase.

### 1. Clone the repository

```bash
git clone [https://github.com/WesleyCords/invetory_management_system.git](https://github.com/WesleyCords/invetory_management_system.git)
cd invetory_management_system
```
