'use strict';

const demos = {
  benzylal: 'spectra/benzylal.jdx',
  cocaine: 'spectra/cocaine.jdx'
};

const graph = new Graph(document.getElementById('spectrum'));
graph.resize(800, 600);
const serie = graph.newSerie('spectrum', { lineToZero: true });
serie.autoAxis();

const load1 = document.getElementById('load1');
const load2 = document.getElementById('load2');

load1.addEventListener('click', loadDemo.bind(null, 'benzylal'));
load2.addEventListener('click', loadDemo.bind(null, 'cocaine'));

async function loadDemo(name) {
  const req = await fetch(demos[name]);
  const body = await req.text();

  const parsed = JcampConverter.convert(body);
  const spectrum = parsed.spectra[0];
  document.getElementById('spectrum-title').innerHTML = spectrum.title;

  const waveForm = Graph.newWaveform();
  waveForm.setData(spectrum.data[0]);
  serie.setWaveform(waveForm);
  graph.draw();
}
