(() => {
  'use strict';

  // ---------- Configuração ----------
  const STORE_KEY = 'grana:v1';
  const THEME_KEY = 'grana:theme';

  const CATEGORIES = {
    out: [
      { id: 'mercado', name: 'Mercado', emoji: '🛒' },
      { id: 'comida', name: 'Comida', emoji: '🍽️' },
      { id: 'casa', name: 'Casa', emoji: '🏠' },
      { id: 'transporte', name: 'Transporte', emoji: '🚗' },
      { id: 'contas', name: 'Contas', emoji: '💡' },
      { id: 'saude', name: 'Saúde', emoji: '💊' },
      { id: 'lazer', name: 'Lazer', emoji: '🎉' },
      { id: 'compras', name: 'Compras', emoji: '🛍️' },
      { id: 'educacao', name: 'Educação', emoji: '📚' },
      { id: 'outros', name: 'Outros', emoji: '✨' },
    ],
    in: [
      { id: 'salario', name: 'Salário', emoji: '💼' },
      { id: 'extra', name: 'Renda extra', emoji: '💸' },
      { id: 'investimentos', name: 'Rendimentos', emoji: '📈' },
      { id: 'presente', name: 'Presente', emoji: '🎁' },
      { id: 'outros-in', name: 'Outros', emoji: '✨' },
    ],
  };
  const catById = Object.fromEntries([...CATEGORIES.out, ...CATEGORIES.in].map(c => [c.id, c]));

  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const fmt = cents => brl.format(cents / 100);
  const $ = sel => document.querySelector(sel);

  // ---------- Estado ----------
  let state = load();
  const today = new Date();
  let view = { year: today.getFullYear(), month: today.getMonth(), filter: 'all', query: '' };
  let editing = null; // id da movimentação em edição
  let form = { type: 'out', cents: 0, category: 'mercado' };

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORE_KEY));
      if (data && Array.isArray(data.transactions)) return { budgets: {}, ...data };
    } catch (_) { /* ignora dados corrompidos */ }
    return { transactions: [], budgets: {} };
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (_) { toast('Não foi possível salvar neste navegador'); }
  }

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const pad = n => String(n).padStart(2, '0');
  const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const monthKey = () => `${view.year}-${pad(view.month + 1)}`;

  // ---------- Renderização ----------
  function monthTx() {
    const key = monthKey();
    return state.transactions.filter(t => t.date.startsWith(key));
  }

  function render() {
    const label = new Date(view.year, view.month, 1)
      .toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    $('#monthLabel').textContent = label.charAt(0).toUpperCase() + label.slice(1).replace(' de ', ' ');

    const txs = monthTx();
    const totalIn = txs.filter(t => t.type === 'in').reduce((s, t) => s + t.amount, 0);
    const totalOut = txs.filter(t => t.type === 'out').reduce((s, t) => s + t.amount, 0);
    const balance = totalIn - totalOut;

    $('#balance').textContent = fmt(balance);
    $('#balance').classList.toggle('neg', balance < 0);
    $('#totalIn').textContent = fmt(totalIn);
    $('#totalOut').textContent = fmt(totalOut);

    renderBudget(totalOut);
    renderCategories(txs, totalOut);
    renderList(txs);
  }

  function renderBudget(totalOut) {
    const budget = state.budgets[monthKey()] ?? state.budgets.default ?? 0;
    const fill = $('#budgetFill');
    if (!budget) {
      $('#budgetText').textContent = 'Defina um limite de gastos para o mês';
      fill.style.width = '0%';
      fill.className = 'bar-fill';
      return;
    }
    const pct = totalOut / budget;
    const left = budget - totalOut;
    $('#budgetText').textContent = left >= 0
      ? `Ainda pode gastar ${fmt(left)} de ${fmt(budget)}`
      : `Passou ${fmt(-left)} do limite de ${fmt(budget)}`;
    fill.style.width = Math.min(pct, 1) * 100 + '%';
    fill.className = 'bar-fill' + (pct > 1 ? ' over' : pct > .8 ? ' warn' : '');
  }

  function renderCategories(txs, totalOut) {
    const sums = {};
    txs.filter(t => t.type === 'out').forEach(t => { sums[t.category] = (sums[t.category] || 0) + t.amount; });
    const rows = Object.entries(sums).sort((a, b) => b[1] - a[1]);
    $('#catEmpty').hidden = rows.length > 0;
    $('#catList').innerHTML = rows.map(([id, amount]) => {
      const c = catById[id] || catById.outros;
      const pct = totalOut ? Math.round(amount / totalOut * 100) : 0;
      return `<li class="cat-row">
        <span class="cat-emoji">${c.emoji}</span>
        <div>
          <div class="cat-name"><span>${c.name}</span><span>${pct}%</span></div>
          <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
        </div>
        <span class="cat-amount">${fmt(amount)}</span>
      </li>`;
    }).join('');
  }

  function renderList(txs) {
    const q = view.query.trim().toLowerCase();
    const list = txs
      .filter(t => view.filter === 'all' || t.type === view.filter)
      .filter(t => !q || (t.desc || '').toLowerCase().includes(q) || (catById[t.category]?.name || '').toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date) || b.created - a.created);

    $('#txEmpty').hidden = list.length > 0;
    $('#txEmpty p').innerHTML = txs.length
      ? 'Nenhuma movimentação encontrada.'
      : 'Nada por aqui ainda.<br />Toque no <strong>+</strong> para anotar seu primeiro gasto.';

    const groups = {};
    list.forEach(t => (groups[t.date] ||= []).push(t));

    $('#txList').innerHTML = Object.entries(groups).map(([date, items]) => {
      const dayTotal = items.reduce((s, t) => s + (t.type === 'in' ? t.amount : -t.amount), 0);
      return `<div class="day-head"><span>${dayLabel(date)}</span><span>${fmt(dayTotal)}</span></div>` +
        items.map(t => {
          const c = catById[t.category] || catById.outros;
          return `<button class="tx" data-id="${t.id}">
            <span class="tx-emoji">${c.emoji}</span>
            <div><div class="tx-title">${escapeHtml(t.desc || c.name)}</div><div class="tx-sub">${c.name}</div></div>
            <span class="tx-amount ${t.type}">${t.type === 'in' ? '+ ' : '− '}${fmt(t.amount)}</span>
          </button>`;
        }).join('');
    }).join('');
  }

  function dayLabel(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const diff = Math.round((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - date) / 864e5);
    if (diff === 0) return 'Hoje';
    if (diff === 1) return 'Ontem';
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  // ---------- Formulário ----------
  function openSheet(tx) {
    editing = tx ? tx.id : null;
    form = tx
      ? { type: tx.type, cents: tx.amount, category: tx.category }
      : { type: 'out', cents: 0, category: CATEGORIES.out[0].id };

    $('#desc').value = tx ? tx.desc : '';
    // Novo lançamento: usa hoje se estiver vendo o mês atual, senão o dia 1 do mês visto
    const isCurrentMonth = view.year === today.getFullYear() && view.month === today.getMonth();
    $('#date').value = tx ? tx.date : (isCurrentMonth ? isoDate(today) : isoDate(new Date(view.year, view.month, 1)));
    $('#deleteBtn').hidden = !tx;
    $('#saveBtn').textContent = tx ? 'Salvar' : 'Adicionar';

    syncForm();
    $('#sheetBackdrop').hidden = false;
    setTimeout(() => { const a = $('#amount'); a.focus(); a.setSelectionRange(a.value.length, a.value.length); }, 60);
  }
  function closeSheet() { $('#sheetBackdrop').hidden = true; }

  function syncForm() {
    document.querySelectorAll('#typeToggle button').forEach(b => b.classList.toggle('active', b.dataset.type === form.type));
    setAmountText();
    $('#catChips').innerHTML = CATEGORIES[form.type].map(c =>
      `<button type="button" class="chip${c.id === form.category ? ' active' : ''}" data-cat="${c.id}">${c.emoji} ${c.name}</button>`
    ).join('');
    $('#saveBtn').disabled = form.cents <= 0;
  }

  function setAmountText() {
    const el = $('#amount');
    el.value = (form.cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    el.style.width = Math.max(el.value.length, 4) + 0.5 + 'ch';
  }

  // Valor digitado como em app de banco: os dígitos entram pela direita (centavos)
  $('#amount').addEventListener('input', e => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    form.cents = Number(digits) || 0;
    setAmountText();
    $('#saveBtn').disabled = form.cents <= 0;
  });
  $('#amount').addEventListener('focus', e => e.target.select());

  $('#typeToggle').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || b.dataset.type === form.type) return;
    form.type = b.dataset.type;
    form.category = CATEGORIES[form.type][0].id;
    syncForm();
  });

  $('#catChips').addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (!b) return;
    form.category = b.dataset.cat;
    document.querySelectorAll('#catChips .chip').forEach(c => c.classList.toggle('active', c === b));
  });

  $('#txForm').addEventListener('submit', e => {
    e.preventDefault();
    if (form.cents <= 0) return;
    const data = {
      type: form.type,
      amount: form.cents,
      category: form.category,
      desc: $('#desc').value.trim(),
      date: $('#date').value || isoDate(today),
    };
    if (editing) {
      Object.assign(state.transactions.find(t => t.id === editing), data);
      toast('Alterado ✓');
    } else {
      state.transactions.push({ id: uid(), created: Date.now(), ...data });
      toast(data.type === 'in' ? 'Entrada anotada ✓' : 'Gasto anotado ✓');
    }
    // Pula para o mês da movimentação salva
    const [y, m] = data.date.split('-').map(Number);
    view.year = y; view.month = m - 1;
    save(); render(); closeSheet();
  });

  $('#deleteBtn').addEventListener('click', () => {
    const idx = state.transactions.findIndex(t => t.id === editing);
    if (idx < 0) return;
    const [removed] = state.transactions.splice(idx, 1);
    save(); render(); closeSheet();
    toast('Excluído', 'Desfazer', () => { state.transactions.push(removed); save(); render(); });
  });

  $('#cancelBtn').addEventListener('click', closeSheet);
  $('#sheetBackdrop').addEventListener('click', e => { if (e.target === e.currentTarget) closeSheet(); });

  // ---------- Navegação e filtros ----------
  function shiftMonth(delta) {
    const d = new Date(view.year, view.month + delta, 1);
    view.year = d.getFullYear(); view.month = d.getMonth();
    render();
  }
  $('#prevMonth').addEventListener('click', () => shiftMonth(-1));
  $('#nextMonth').addEventListener('click', () => shiftMonth(1));
  $('#monthLabel').addEventListener('click', () => { view.year = today.getFullYear(); view.month = today.getMonth(); render(); });

  $('#filterSeg').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    view.filter = b.dataset.filter;
    document.querySelectorAll('#filterSeg button').forEach(x => x.classList.toggle('active', x === b));
    render();
  });
  $('#search').addEventListener('input', e => { view.query = e.target.value; render(); });

  $('#txList').addEventListener('click', e => {
    const b = e.target.closest('.tx');
    if (b) openSheet(state.transactions.find(t => t.id === b.dataset.id));
  });
  $('#addBtn').addEventListener('click', () => openSheet());

  $('#budgetBtn').addEventListener('click', () => {
    const current = state.budgets[monthKey()] ?? state.budgets.default ?? 0;
    const input = prompt('Quanto você quer gastar no máximo por mês? (R$)', current ? (current / 100).toFixed(2).replace('.', ',') : '');
    if (input === null) return;
    const cents = Math.round(parseFloat(input.replace(/\./g, '').replace(',', '.')) * 100);
    if (!cents || cents < 0) { delete state.budgets.default; }
    else { state.budgets.default = cents; }
    delete state.budgets[monthKey()];
    save(); render();
  });

  // Atalhos: "n" para novo, Esc para fechar, setas para trocar mês
  document.addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
    if (e.key === 'Escape') { closeSheet(); closeMenu(); }
    if (typing || !$('#sheetBackdrop').hidden) return;
    if (e.key === 'n' || e.key === '+') { e.preventDefault(); openSheet(); }
    if (e.key === 'ArrowLeft') shiftMonth(-1);
    if (e.key === 'ArrowRight') shiftMonth(1);
  });

  // ---------- Menu / dados ----------
  const openMenu = () => { $('#menuBackdrop').hidden = false; };
  const closeMenu = () => { $('#menuBackdrop').hidden = true; };
  $('#menuBtn').addEventListener('click', openMenu);
  $('#closeMenu').addEventListener('click', closeMenu);
  $('#menuBackdrop').addEventListener('click', e => { if (e.target === e.currentTarget) closeMenu(); });

  function download(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  $('#exportCsv').addEventListener('click', () => {
    const rows = monthTx().sort((a, b) => a.date.localeCompare(b.date));
    const csvCell = v => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [['Data', 'Tipo', 'Categoria', 'Descrição', 'Valor'].map(csvCell).join(';')];
    rows.forEach(t => {
      const [y, m, d] = t.date.split('-');
      const value = ((t.type === 'in' ? 1 : -1) * t.amount / 100).toFixed(2).replace('.', ',');
      lines.push([`${d}/${m}/${y}`, t.type === 'in' ? 'Entrada' : 'Saída', catById[t.category]?.name || '', t.desc, value].map(csvCell).join(';'));
    });
    // BOM para o Excel reconhecer os acentos
    download(`grana-${monthKey()}.csv`, '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
    closeMenu();
  });

  $('#exportJson').addEventListener('click', () => {
    download(`grana-backup-${isoDate(today)}.json`, JSON.stringify(state, null, 2), 'application/json');
    closeMenu();
  });

  $('#importJson').addEventListener('change', async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!Array.isArray(data.transactions)) throw new Error('formato');
      if (!confirm(`Restaurar backup com ${data.transactions.length} movimentações? Os dados atuais serão substituídos.`)) return;
      state = { budgets: {}, ...data };
      save(); render(); closeMenu();
      toast('Backup restaurado ✓');
    } catch (_) {
      toast('Arquivo de backup inválido');
    }
  });

  $('#clearAll').addEventListener('click', () => {
    if (!confirm('Apagar todas as movimentações? Isso não pode ser desfeito.')) return;
    state = { transactions: [], budgets: {} };
    save(); render(); closeMenu();
    toast('Tudo apagado');
  });

  // ---------- Tema ----------
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1c1b19' : '#f5f1ea';
  }
  let theme;
  try { theme = localStorage.getItem(THEME_KEY); } catch (_) {}
  applyTheme(theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  $('#themeBtn').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
  });

  // ---------- Aviso rápido ----------
  let toastTimer;
  function toast(msg, actionLabel, action) {
    const el = $('#toast');
    el.innerHTML = '';
    el.append(msg);
    if (actionLabel) {
      const b = document.createElement('button');
      b.textContent = actionLabel;
      b.onclick = () => { action(); el.classList.remove('show'); };
      el.append(b);
    }
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), actionLabel ? 5000 : 2200);
  }

  render();
})();
