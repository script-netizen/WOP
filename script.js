document.addEventListener('DOMContentLoaded', () => {
  const tabBar = document.querySelector('.tab-bar');
  const hoverDetect = document.querySelector('.hover-detect');
  
  // Show tab bar when cursor is near the top
  hoverDetect.addEventListener('mouseenter', () => {
    tabBar.classList.add('show');
  });

  tabBar.addEventListener('mouseenter', () => {
    tabBar.classList.add('show');
  });

  tabBar.addEventListener('mouseleave', () => {
    if (!hoverDetect.matches(':hover')) {
      tabBar.classList.remove('show');
    }
  });

  hoverDetect.addEventListener('mouseleave', () => {
    if (!tabBar.matches(':hover')) {
      tabBar.classList.remove('show');
    }
  });

  // Tab switching functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Initialize game in background
  const gameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Tomb of the Mask</title>
        <style>
          body { margin: 0; }
          #gameContainer { width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="gameContainer"></div>
        <script src="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/UnityProgress.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/topvaz/gfiles1@738d9cb2953428620c44ba7cdb62705b6540bb00/tomb-of-the-mask/d5fuh3d/UnityLoader.js"></script>
        <script>
          var gameInstance;
          window.addEventListener('load', function() {
            gameInstance = UnityLoader.instantiate(
              "gameContainer",
              "https://cdn.jsdelivr.net/gh/topvaz/gfiles1@738d9cb2953428620c44ba7cdb62705b6540bb00/tomb-of-the-mask/d5fuh3d/totm.json",
              {
                onProgress: UnityProgress,
                Module: {
                  onRuntimeInitialized: function() {
                    UnityProgress(gameInstance, "complete");
                  }
                }
              }
            );
          });
        </script>
      </body>
    </html>
  `;

  let hiddenFrame = document.createElement('iframe');
  hiddenFrame.style.display = 'none';
  document.body.appendChild(hiddenFrame);
  hiddenFrame.contentWindow.document.write(gameHtml);

  // Tomb of the Mask game button functionality
  const gameBtn = document.getElementById('tombMaskGame');
  gameBtn.addEventListener('click', () => {
    const gameWindow = window.open('about:blank', '_blank');
    
    gameWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Background Services...</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              font-family: Arial, sans-serif;
              background: linear-gradient(180deg, #1a1a1a 0%, #2d1f2d 100%);
              color: white;
            }
            .ad-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              text-align: center;
              padding: 20px;
            }
            .ad-title {
              font-size: 2.5rem;
              margin-bottom: 2rem;
              background: linear-gradient(45deg, #FFB347, #FFCC33);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            }
            .continue-btn {
              background: linear-gradient(45deg, #FF8C42, #FFB347);
              color: white;
              border: none;
              padding: 1rem 2rem;
              border-radius: 4px;
              cursor: pointer;
              font-size: 1.2rem;
              transition: all 0.3s ease;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              margin-top: 2rem;
            }
            .continue-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            .game-container {
              display: none;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <div class="ad-container" id="adScreen">
            <h1 class="ad-title">This Game Was Brought to You by Flashpoint</h1>
            <p>Thank you for using our services!</p>
            <button class="continue-btn" onclick="continueToGame()">Continue to Game</button>
          </div>
          <div class="game-container" id="gameContent">
            ${gameHtml}
          </div>
          <script>
            function continueToGame() {
              document.getElementById('adScreen').style.display = 'none';
              document.getElementById('gameContent').style.display = 'block';
            }
          </script>
        </body>
      </html>
    `);
  });

  // Proxy button functionality
  const proxyBtn = document.getElementById('freebieProxy');
  proxyBtn.addEventListener('click', () => {
    const proxyWindow = window.open('about:blank', '_blank');
    
    proxyWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Background Services...</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              font-family: Arial, sans-serif;
              background: linear-gradient(180deg, #1a1a1a 0%, #2d1f2d 100%);
              color: white;
            }
            .ad-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              text-align: center;
              padding: 20px;
            }
            .ad-title {
              font-size: 2.5rem;
              margin-bottom: 2rem;
              background: linear-gradient(45deg, #FFB347, #FFCC33);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            }
            .continue-btn {
              background: linear-gradient(45deg, #FF8C42, #FFB347);
              color: white;
              border: none;
              padding: 1rem 2rem;
              border-radius: 4px;
              cursor: pointer;
              font-size: 1.2rem;
              transition: all 0.3s ease;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              margin-top: 2rem;
            }
            .continue-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            .proxy-container {
              display: none;
              width: 100%;
              height: 100%;
            }
            embed {
              width: 100%;
              height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <div class="ad-container" id="adScreen">
            <h1 class="ad-title">This Proxy Was Brought to You by Flashpoint</h1>
            <p>Thank you for using our services!</p>
            <button class="continue-btn" onclick="continueToProxy()">Continue to Proxy</button>
          </div>
          <div class="proxy-container" id="proxyContent">
            <embed src="https://fluxis.thedesktop.com" type="text/html" width="100%" height="100%">
          </div>
          <script>
            function continueToProxy() {
              document.getElementById('adScreen').style.display = 'none';
              document.getElementById('proxyContent').style.display = 'block';
            }
          </script>
        </body>
      </html>
    `);
  });
});
