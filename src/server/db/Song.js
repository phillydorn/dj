module.exports = (sequelize, Sequelize) => {
  const Song = sequelize.define('song', {
    name: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    },
    youTubeId: {
      type: Sequelize.STRING
    }
  });

  // force: true will drop the table if it already exists
  Song.sync({force: true}).then(() => {
    // Table created
    return true
  });
  
  return Song;
}
