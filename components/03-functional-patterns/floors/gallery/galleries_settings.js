var galleries = [];
for (var g = 1; g <= 10; g++) {
  galleries[g] = [];
  for (var i = 0; i < g; i++) {
    galleries[g][i] = {
        src: 'http://lorempixel.com/1600/800/nature/'+ (i % 4 + 1)  +'/',
        w: 1600,
        h: 800,
        title: 'Huga Huga'
    };
  }
}
