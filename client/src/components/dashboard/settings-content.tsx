import { User, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SettingsSecurityTab } from "./components/settings-security-tab";
import { SettingsProfileTab } from "./components/settings-profile-tab";
import { motion } from "framer-motion";

export function SettingsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col max-w-[75%] mx-auto"
    >
      <h1 className="text-2xl font-bold">Configurações</h1>
      <p className="text-gray-600">
        Gerencie suas informacoes pessoais e seguranca
      </p>
      <Tabs defaultValue="profile" className="mt-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock />
            Segurança
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <SettingsProfileTab />
        </TabsContent>
        <TabsContent value="security">
          <SettingsSecurityTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
