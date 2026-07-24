(function () {
  'use strict';

  const FAQ_URL = '/ai_ax_main/data/faq.json';
  const INITIAL_IDS = ['refund_what', 'curriculum_all', 'coach_verify', 'process_apply_where', 'contact_general'];

  let faqData = [];
  let isOpen = false;
  let initialized = false;

  async function loadFAQ() {
    try {
      const res = await fetch(FAQ_URL);
      faqData = await res.json();
    } catch (e) {
      console.error('GptClass FAQ 로드 실패:', e);
    }
  }

  function findById(id) {
    return faqData.find(f => f.id === id) || null;
  }

  function findByKeyword(text) {
    const q = text.toLowerCase().replace(/\s+/g, '');
    let best = null, bestScore = 0;
    for (const item of faqData) {
      let score = 0;
      for (const kw of item.keywords) {
        if (q.includes(kw.replace(/\s+/g, ''))) score += 2;
      }
      const itemQ = item.question.replace(/\s+/g, '').toLowerCase();
      if (itemQ.includes(q) || q.includes(itemQ.slice(0, 4))) score += 1;
      if (score > bestScore) { bestScore = score; best = item; }
    }
    return bestScore > 0 ? best : null;
  }

  function injectStyles() {
    if (document.getElementById('gc-styles')) return;
    const s = document.createElement('style');
    s.id = 'gc-styles';
    s.textContent = `
      #gc-btn {
        position: fixed; bottom: 28px; right: 28px; z-index: 9998;
        background: #1E293B; color: #fff; border: 2px solid #7DD3FC; border-radius: 50px;
        padding: 13px 22px; cursor: pointer;
        font-family: 'Inter','Noto Sans KR',sans-serif;
        font-size: 0.93rem; font-weight: 700;
        display: flex; align-items: center; gap: 8px;
        box-shadow: 0 6px 24px rgba(0,0,0,0.28), 0 0 0 1px rgba(125,211,252,0.2);
        transition: all 0.2s;
      }
      #gc-btn:hover { background: #0F172A; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.38), 0 0 0 3px rgba(125,211,252,0.3); }
      #gc-btn .gc-btn-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #5FD9A8; animation: gc-pulse 2s infinite;
      }
      @keyframes gc-pulse {
        0%,100% { opacity: 1; } 50% { opacity: 0.4; }
      }
      #gc-box {
        position: fixed; bottom: 90px; right: 28px; z-index: 9999;
        width: 360px; max-height: 560px;
        background: #fff; border-radius: 20px;
        box-shadow: 0 16px 56px rgba(0,0,0,0.18);
        display: flex; flex-direction: column;
        font-family: 'Inter','Noto Sans KR',sans-serif;
        overflow: hidden;
        transform: scale(0.9) translateY(20px); opacity: 0; pointer-events: none;
        transition: transform 0.22s cubic-bezier(0.2,0.8,0.2,1), opacity 0.22s;
      }
      #gc-box.gc-open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
      .gc-head {
        background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        padding: 16px 18px; display: flex; align-items: center; justify-content: space-between;
        flex-shrink: 0;
      }
      .gc-head-info .gc-head-name { color: #fff; font-weight: 800; font-size: 1rem; }
      .gc-head-info .gc-head-sub { color: rgba(255,255,255,0.6); font-size: 0.74rem; margin-top: 3px; }
      .gc-x {
        background: rgba(255,255,255,0.12); border: none; border-radius: 50%;
        width: 30px; height: 30px; color: #fff; font-size: 0.95rem;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: background 0.15s; flex-shrink: 0;
      }
      .gc-x:hover { background: rgba(255,255,255,0.24); }
      .gc-msgs {
        flex: 1; overflow-y: auto; padding: 16px 14px;
        display: flex; flex-direction: column; gap: 10px;
        scroll-behavior: smooth;
      }
      .gc-msgs::-webkit-scrollbar { width: 4px; }
      .gc-msgs::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
      .gc-row { display: flex; flex-direction: column; }
      .gc-row.gc-user { align-items: flex-end; }
      .gc-row.gc-bot { align-items: flex-start; }
      .gc-bubble {
        max-width: 82%; padding: 10px 14px; font-size: 0.855rem; line-height: 1.7;
        white-space: pre-wrap; word-break: keep-all;
      }
      .gc-bot .gc-bubble {
        background: #F1F5F9; color: #1c1b1b;
        border-radius: 4px 14px 14px 14px;
      }
      .gc-user .gc-bubble {
        background: #1E293B; color: #fff;
        border-radius: 14px 4px 14px 14px;
      }
      .gc-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; max-width: 100%; }
      .gc-chip {
        background: #fff; border: 1.5px solid #1E293B; color: #1E293B;
        border-radius: 100px; padding: 5px 12px;
        font-size: 0.77rem; font-weight: 600; cursor: pointer;
        font-family: 'Inter','Noto Sans KR',sans-serif;
        transition: all 0.15s; white-space: nowrap;
      }
      .gc-chip:hover { background: #1E293B; color: #fff; }
      .gc-foot {
        border-top: 1px solid #E4E8F0; padding: 10px 12px;
        display: flex; gap: 8px; align-items: center; flex-shrink: 0;
      }
      .gc-input {
        flex: 1; border: 1.5px solid #E4E8F0; border-radius: 100px;
        padding: 9px 14px; font-size: 0.855rem; outline: none;
        font-family: 'Inter','Noto Sans KR',sans-serif; color: #1c1b1b;
        transition: border-color 0.15s;
      }
      .gc-input::placeholder { color: #9094A8; }
      .gc-input:focus { border-color: #1E293B; }
      .gc-send {
        background: #1E293B; border: none; border-radius: 50%;
        width: 36px; height: 36px; color: #fff; font-size: 1rem;
        cursor: pointer; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.15s;
      }
      .gc-send:hover { background: #0F172A; }
      @media (max-width: 480px) {
        #gc-box { width: calc(100vw - 20px); right: 10px; bottom: 76px; max-height: 70vh; }
        #gc-btn { right: 10px; bottom: 10px; padding: 11px 18px; font-size: 0.87rem; }
      }
    `;
    document.head.appendChild(s);
  }

  function buildWidget() {
    // Floating button
    const btn = document.createElement('button');
    btn.id = 'gc-btn';
    btn.innerHTML = '<span class="gc-btn-dot"></span>상담하기';
    document.body.appendChild(btn);

    // Chat box
    const box = document.createElement('div');
    box.id = 'gc-box';
    box.innerHTML = `
      <div class="gc-head">
        <div class="gc-head-info">
          <div class="gc-head-name">GptClass 교육 상담</div>
          <div class="gc-head-sub">무엇이든 물어보세요</div>
        </div>
        <button class="gc-x" aria-label="닫기">✕</button>
      </div>
      <div class="gc-msgs" id="gc-msgs"></div>
      <div class="gc-foot">
        <input class="gc-input" id="gc-input" type="text" placeholder="질문을 입력하세요…" autocomplete="off" />
        <button class="gc-send" id="gc-send" aria-label="전송">&#10148;</button>
      </div>
    `;
    document.body.appendChild(box);

    btn.addEventListener('click', toggleChat);
    box.querySelector('.gc-x').addEventListener('click', toggleChat);
    document.getElementById('gc-send').addEventListener('click', handleSend);
    document.getElementById('gc-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSend();
    });
  }

  function toggleChat() {
    isOpen = !isOpen;
    const box = document.getElementById('gc-box');
    if (isOpen) {
      box.classList.add('gc-open');
      if (!initialized) { showWelcome(); initialized = true; }
      setTimeout(() => document.getElementById('gc-input').focus(), 250);
    } else {
      box.classList.remove('gc-open');
    }
  }

  function showWelcome() {
    appendBot('안녕하세요! GptClass 교육 상담봇이에요 😊\n자주 묻는 질문을 선택하거나 궁금한 것을 직접 입력해 보세요.');
    const items = INITIAL_IDS.map(findById).filter(Boolean);
    appendChips(items);
  }

  function appendBot(text, relatedItems) {
    const msgs = document.getElementById('gc-msgs');
    const row = document.createElement('div');
    row.className = 'gc-row gc-bot';
    const bubble = document.createElement('div');
    bubble.className = 'gc-bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    if (relatedItems && relatedItems.length) {
      const chips = makeChips(relatedItems);
      row.appendChild(chips);
    }
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function appendUser(text) {
    const msgs = document.getElementById('gc-msgs');
    const row = document.createElement('div');
    row.className = 'gc-row gc-user';
    const bubble = document.createElement('div');
    bubble.className = 'gc-bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function appendChips(items) {
    const msgs = document.getElementById('gc-msgs');
    const chips = makeChips(items);
    msgs.appendChild(chips);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function makeChips(items) {
    const div = document.createElement('div');
    div.className = 'gc-chips';
    items.forEach(item => {
      const c = document.createElement('button');
      c.className = 'gc-chip';
      c.textContent = item.question;
      c.addEventListener('click', () => handleChip(item));
      div.appendChild(c);
    });
    return div;
  }

  function handleChip(item) {
    appendUser(item.question);
    showAnswer(item);
  }

  function handleSend() {
    const input = document.getElementById('gc-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    appendUser(text);
    const item = findByKeyword(text);
    if (item) {
      showAnswer(item);
    } else {
      appendBot('죄송해요, 정확한 답변을 찾지 못했어요 😅\n아래 항목을 선택하거나 이메일로 직접 문의해 주세요.\n📧 ax@limefriends.com');
      appendChips(INITIAL_IDS.map(findById).filter(Boolean));
    }
  }

  function showAnswer(item) {
    const related = (item.related || []).map(findById).filter(Boolean);
    appendBot(item.answer, related.length ? related : null);
  }

  async function init() {
    await loadFAQ();
    injectStyles();
    buildWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
