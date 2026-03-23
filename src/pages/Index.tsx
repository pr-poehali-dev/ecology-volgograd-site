import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/a6d28f1a-5e15-45eb-8c10-feb1b2cc03b7/files/58d36223-4776-456e-8430-288d6db78adf.jpg";

const NAV_ITEMS = ["Главная", "Экология города", "Карта загрязнений", "Новости"];

const STATS = [
  { label: "Промышленных предприятий", value: "120+", icon: "Factory" },
  { label: "Превышений ПДК в год", value: "340", icon: "AlertTriangle" },
  { label: "Площадь зелёных зон", value: "18%", icon: "Trees" },
  { label: "Мониторинговых станций", value: "12", icon: "Radio" },
];

const INDUSTRIES = [
  {
    name: "Металлургия",
    percent: 38,
    desc: "Выбросы оксидов азота, серы и тяжёлых металлов. Основные источники — сталелитейные заводы.",
    icon: "Flame",
  },
  {
    name: "Химическая промышленность",
    percent: 27,
    desc: "Выбросы летучих органических соединений и хлористых веществ.",
    icon: "FlaskConical",
  },
  {
    name: "Нефтепереработка",
    percent: 21,
    desc: "Выбросы углеводородов, бензапирена и продуктов сгорания.",
    icon: "Droplets",
  },
  {
    name: "Транспорт и ТЭЦ",
    percent: 14,
    desc: "CO₂, оксид углерода и мелкодисперсные частицы PM2.5.",
    icon: "Zap",
  },
];

const MAP_ZONES = [
  { name: "Красноармейский район", level: "критический", color: "bg-red-500", x: 72, y: 68 },
  { name: "Центральный район", level: "умеренный", color: "bg-yellow-500", x: 50, y: 42 },
  { name: "Тракторозаводский", level: "высокий", color: "bg-orange-500", x: 30, y: 28 },
  { name: "Советский район", level: "низкий", color: "bg-green-500", x: 60, y: 58 },
  { name: "Кировский район", level: "умеренный", color: "bg-yellow-500", x: 42, y: 55 },
];

const RECOMMENDATIONS = [
  {
    audience: "Горожанам",
    icon: "Users",
    color: "from-emerald-50 to-green-100",
    borderColor: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    items: [
      { icon: "TreePine", text: "Высаживайте деревья и кустарники у домов — 1 дерево поглощает до 22 кг CO₂ в год" },
      { icon: "Bike", text: "Пересаживайтесь на велосипед или самокат для поездок до 5 км" },
      { icon: "Recycle", text: "Сортируйте мусор: пункты приёма вторсырья есть в каждом районе города" },
      { icon: "Droplets", text: "Экономьте воду — закрывайте кран при чистке зубов, используйте аэраторы" },
    ],
  },
  {
    audience: "Бизнесу",
    icon: "Building2",
    color: "from-amber-50 to-yellow-100",
    borderColor: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    items: [
      { icon: "Filter", text: "Установите современные фильтры очистки воздуха и сточных вод на производстве" },
      { icon: "Sun", text: "Переходите на солнечную генерацию: субсидии до 40% стоимости оборудования в 2026 г." },
      { icon: "ClipboardCheck", text: "Проводите ежегодный экологический аудит и публикуйте результаты открыто" },
      { icon: "Leaf", text: "Озеленяйте промышленные территории — защитные полосы деревьев снижают шум и пыль" },
    ],
  },
  {
    audience: "Городским властям",
    icon: "Landmark",
    color: "from-sky-50 to-blue-100",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    items: [
      { icon: "MapPin", text: "Расширить сеть станций мониторинга воздуха до 30 точек к 2027 году" },
      { icon: "Bus", text: "Перевести городской транспорт на электро- и газомоторное топливо" },
      { icon: "Wind", text: "Ввести «зелёные зоны» вокруг школ и больниц с ограничением промвыбросов" },
      { icon: "BookOpen", text: "Запустить экологическое просвещение в школах — уроки природоведения с полевыми выходами" },
    ],
  },
];

const NEWS = [
  {
    date: "18 марта 2026",
    title: "Волгоградский НПЗ снизил выбросы на 12%",
    tag: "Промышленность",
    tagColor: "bg-green-100 text-green-800",
    text: "По итогам 2025 года нефтеперерабатывающий завод сообщил о сокращении объёма вредных выбросов благодаря модернизации очистных систем.",
  },
  {
    date: "10 марта 2026",
    title: "Превышение ПДК по диоксиду азота в Краснооктябрьском районе",
    tag: "Мониторинг",
    tagColor: "bg-orange-100 text-orange-800",
    text: "Станция мониторинга зафиксировала трёхкратное превышение допустимой концентрации NO₂ в ночные часы.",
  },
  {
    date: "3 марта 2026",
    title: "Высадка 5 000 деревьев в рамках «Зелёного Волгограда»",
    tag: "Природа",
    tagColor: "bg-emerald-100 text-emerald-800",
    text: "Городские волонтёры совместно с администрацией провели масштабную акцию озеленения в трёх районах города.",
  },
  {
    date: "24 февраля 2026",
    title: "Волга: качество воды улучшилось по 6 из 10 показателей",
    tag: "Водоёмы",
    tagColor: "bg-blue-100 text-blue-800",
    text: "Роспотребнадзор опубликовал результаты плановых замеров. Качество воды в акватории Волги в черте города продолжает улучшаться.",
  },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState("Главная");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background nature-texture">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Leaf" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-cormorant font-semibold text-xl text-foreground tracking-wide">
              ЭкоВолгоград
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`nav-link font-golos text-sm font-medium transition-colors hover:text-primary ${
                  activeNav === item ? "active text-primary" : "text-foreground/70"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => { setActiveNav(item); setMobileOpen(false); }}
                className={`text-left font-golos text-sm font-medium py-1 ${
                  activeNav === item ? "text-primary" : "text-foreground/70"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

        <div className="absolute top-24 right-16 w-32 h-32 opacity-20 animate-float">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 10 C90 10, 110 40, 100 70 C90 100, 60 110, 30 95 C10 80, 10 50, 30 30 C45 15, 60 10, 60 10Z" fill="hsl(138, 45%, 28%)" />
            <path d="M60 10 L60 100" stroke="hsl(138, 45%, 38%)" strokeWidth="2" opacity="0.5"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-golos font-medium mb-6 animate-fade-up">
              🌿 Экологический мониторинг города
            </span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-semibold text-foreground leading-tight mb-6 animate-fade-up delay-100">
              Живая природа<br />
              <em className="text-primary">Волгограда</em>
            </h1>
            <p className="font-golos text-base md:text-lg text-foreground/70 leading-relaxed mb-10 animate-fade-up delay-200">
              Следим за состоянием воздуха, воды и зелёных зон. Оцениваем влияние промышленных предприятий и ищем путь к чистому городу.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <button
                onClick={() => setActiveNav("Карта загрязнений")}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-golos font-medium text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Смотреть карту
              </button>
              <button
                onClick={() => setActiveNav("Экология города")}
                className="px-6 py-3 rounded-full border border-primary text-primary font-golos font-medium text-sm hover:bg-primary/10 transition-all"
              >
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary/5 border-y border-primary/10 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Icon name={s.icon} size={18} className="text-primary" />
              </div>
              <div className="font-cormorant text-4xl font-bold text-primary">{s.value}</div>
              <div className="font-golos text-xs text-foreground/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ECOLOGY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-primary text-xs font-golos font-medium uppercase tracking-widest">Экология города</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground mt-2">
            Влияние промышленности
          </h2>
          <p className="font-golos text-foreground/60 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Волгоград — крупный промышленный центр. Предприятия вносят основной вклад в загрязнение воздуха и водоёмов.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <div
              key={i}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={ind.icon} size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-golos font-medium text-sm text-foreground">{ind.name}</span>
                    <span className="font-cormorant text-xl font-bold text-primary">{ind.percent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${ind.percent}%` }} />
                  </div>
                </div>
              </div>
              <p className="font-golos text-xs text-foreground/60 leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-br from-primary/8 to-green-100/50 rounded-3xl p-8 border border-primary/15">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Icon name="Info" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-2">Что делает город?</h3>
              <p className="font-golos text-sm text-foreground/70 leading-relaxed">
                В 2024–2026 годах администрация Волгограда ввела экологические квоты для крупнейших предприятий,
                обязала установить фильтрационные системы на 43 объектах и запустила проект «Зелёный пояс» —
                высадку защитных полос деревьев вдоль промышленных зон.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-muted/40 border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-primary text-xs font-golos font-medium uppercase tracking-widest">Мониторинг</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground mt-2">
              Карта загрязнений
            </h2>
            <p className="font-golos text-foreground/60 mt-4 max-w-xl mx-auto text-sm">
              Уровень загрязнения воздуха по районам Волгограда на основе данных Росгидромета
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-green-50 to-emerald-100 leaf-pattern">
                <div
                  className="absolute right-8 top-8 bottom-8 w-10 bg-blue-200/70 rounded-full"
                  style={{ clipPath: "polygon(20% 0%, 80% 5%, 100% 20%, 90% 80%, 70% 100%, 30% 95%, 10% 75%, 0% 40%, 10% 10%)" }}
                />
                <div className="absolute right-9 top-12 font-golos text-[9px] text-blue-600 font-medium" style={{ writingMode: "vertical-rl" }}>р. Волга</div>

                {MAP_ZONES.map((zone, i) => (
                  <div
                    key={i}
                    className="absolute group cursor-pointer"
                    style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <div
                      className={`w-5 h-5 rounded-full ${zone.color} opacity-80 border-2 border-white shadow-md animate-float`}
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                    <div className="absolute left-7 top-1/2 -translate-y-1/2 hidden group-hover:block bg-white border border-border rounded-xl px-3 py-2 shadow-lg w-48 z-10">
                      <div className="font-golos font-medium text-xs text-foreground">{zone.name}</div>
                      <div className="font-golos text-xs text-foreground/60 mt-0.5">Уровень: {zone.level}</div>
                    </div>
                  </div>
                ))}

                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-border">
                  <span className="font-golos text-xs font-medium text-foreground">Волгоград</span>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border flex flex-wrap gap-3">
                {[
                  { color: "bg-red-500", label: "Критический" },
                  { color: "bg-orange-500", label: "Высокий" },
                  { color: "bg-yellow-500", label: "Умеренный" },
                  { color: "bg-green-500", label: "Низкий" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                    <span className="font-golos text-xs text-foreground/70">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {MAP_ZONES.map((zone, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border px-4 py-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${zone.color}`} />
                  <div>
                    <div className="font-golos text-sm font-medium text-foreground">{zone.name}</div>
                    <div className="font-golos text-xs text-foreground/50 capitalize">{zone.level}</div>
                  </div>
                </div>
              ))}
              <p className="font-golos text-xs text-foreground/40 mt-2 leading-relaxed">
                * Данные обновляются ежедневно по данным станций автоматического мониторинга воздуха
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-primary text-xs font-golos font-medium uppercase tracking-widest">Что можно сделать</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground mt-2">
            Рекомендации по улучшению
          </h2>
          <p className="font-golos text-foreground/60 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Экология Волгограда — общая ответственность. Каждый может внести вклад: от простых привычек до системных изменений.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {RECOMMENDATIONS.map((rec, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${rec.color} border ${rec.borderColor} rounded-3xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${rec.iconBg} flex items-center justify-center`}>
                  <Icon name={rec.icon} size={18} className={rec.iconColor} />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-foreground">{rec.audience}</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {rec.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg ${rec.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon name={item.icon} size={13} className={rec.iconColor} />
                    </div>
                    <span className="font-golos text-sm text-foreground/75 leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-primary/10 via-green-100/60 to-primary/5 rounded-3xl px-8 py-6 border border-primary/15 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Icon name="Heart" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-1">Каждое действие важно</h3>
            <p className="font-golos text-sm text-foreground/65 leading-relaxed">
              Если каждый житель Волгограда посадит хотя бы одно дерево, город получит более 1 миллиона новых зелёных защитников. Начните сегодня.
            </p>
          </div>
          <button className="flex-shrink-0 px-6 py-3 rounded-full bg-primary text-primary-foreground font-golos font-medium text-sm hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap">
            Присоединиться
          </button>
        </div>
      </section>

      {/* NEWS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary text-xs font-golos font-medium uppercase tracking-widest">Последние события</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground mt-2">Новости</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary font-golos text-sm font-medium hover:gap-3 transition-all">
            Все новости <Icon name="ArrowRight" size={14} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {NEWS.map((n, i) => (
            <article
              key={i}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-golos font-medium ${n.tagColor}`}>
                  {n.tag}
                </span>
                <span className="font-golos text-xs text-foreground/40">{n.date}</span>
              </div>
              <h3 className="font-cormorant text-xl font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                {n.title}
              </h3>
              <p className="font-golos text-sm text-foreground/60 leading-relaxed">{n.text}</p>
              <div className="mt-4 flex items-center gap-1 text-primary text-xs font-golos font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Читать далее <Icon name="ArrowRight" size={12} />
              </div>
            </article>
          ))}
        </div>

        <div className="md:hidden text-center mt-6">
          <button className="px-6 py-3 rounded-full border border-primary text-primary font-golos font-medium text-sm hover:bg-primary/10 transition-all">
            Все новости
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Leaf" size={16} className="text-primary-foreground" />
              </div>
              <span className="font-cormorant font-semibold text-xl text-foreground">ЭкоВолгоград</span>
            </div>
            <p className="font-golos text-xs text-foreground/40 text-center">
              Данные носят информационный характер. Источники: Росгидромет, Роспотребнадзор, Администрация Волгоградской области.
            </p>
            <div className="flex gap-4">
              {["Контакты", "О проекте", "Данные"].map((l) => (
                <button key={l} className="font-golos text-xs text-foreground/50 hover:text-primary transition-colors">
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}