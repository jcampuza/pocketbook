export const mockScripts = [
  {
    id: 1,
    title: 'Return Appointment',
    description: `
      Returns an appointment in the flexdrive dealer portal.
      Will skip through all the flows with the default options checked, or the
      least destructive options`,
    body: `function helloWorld() {
  console.log("hello world");`
  },
  {
    id: 2,
    title: 'Pickup Appointment',
    description: `
      Pickup an appointment in the flexdrive dealer portal.
      Will skip through all the flows with the default options checked, or the
      least destructive options`,
    body: `// PICKUP SUP
    (async () => {
      const delay = (ms) => new Promise(res => setTimeout(() => res(), ms));
      const qsa = (sel) => Array.from(document.querySelectorAll(sel));	
      const clickContinue = () => {
        const btns = qsa('button');
        btns.find(btn => btn.innerText === 'Continue').click();	
      }

      // check verify infos
      const checks = qsa('input[type="checkbox"]');
      checks.forEach(check => check.click());
      clickContinue();

      await delay(200);

      // vehicle Inspection
      const radioGroups = qsa('.InspectionCard__RadioList');
      radioGroups.forEach(group => {
        const radios = group.querySelectorAll('input[type="radio"]');
        radios[0].click();
      });

      clickContinue();
      await delay(200);

      // tap to sign
      const tappable = qsa('[data-hook=tap-to-sign]');
      tappable[0].click();
    })()`

  }
];