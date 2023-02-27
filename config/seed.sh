echo 'logging into db root as techblog'
mysql -u root --password="C@rri11o"  << EOF
SOURCE db/seeds.sql;
quit
EOF
echo 'Successfully Seeded Database Database'