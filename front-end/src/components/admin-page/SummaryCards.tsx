import documentosIcon from "../../assets/icons/icons-colors/documentos.svg?react";
import clienteIcon from "../../assets/icons/icons-colors/cliente.svg?react";
import usuariosIcon from "../../assets/icons/icons-colors/usuarios.svg?react";
import setoresIcon from "../../assets/icons/icons-colors/usuarios.svg?react";

export function SummaryCards() {
  const cards = [
    {
      title: "Documentos",
      value: "12.859",
      icon: documentosIcon,
      color: "text-azul-interativo",
    },
    {
      title: "Setores",
      value: "4",
      icon: setoresIcon,
      color: "text-amarelo",
    },
    {
      title: "Usuários",
      value: "200",
      icon: usuariosIcon,
      color: "text-purple-500",
    },
    {
      title: "Clientes",
      value: "60",
      icon: clienteIcon,
      color: "text-verde",
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-off-white p-4 rounded-xl border border-bordaoff-white shadow-sm flex items-center gap-4 h-24"
          >
            <Icon className={`w-8 h-8 ${card.color}`} strokeWidth={1.2} />

            <div className="flex flex-col">
              <h3 className={`text-xl font-semibold ${card.color}`}>
                {card.title}
              </h3>
              <p className="text-xl text-cinza-escuro">{card.value}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
