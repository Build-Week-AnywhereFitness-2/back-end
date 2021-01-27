
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('full_name').notNullable();

            table.int('role')
                .references('id')
                .inTable('roles')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.int('signup_code')
                .references('id')
                .inTable('signup_codes')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('signup_codes', table => {
            table.increments('id');
            table.string('code').notNullable();
        })
        .createTable('roles', table => {
            table.increments('id');
            table.string('name').notNullable();
        })
        .createTable('classes', table => {
            table.increments('id');
            table.string('name')
                .notNullable()
                .unique();
            table.string('start_time').notNullable();
            table.string('duration').notNullable();
            table.int('intensity_level').notNullable();
            table.string('location').notNullable();
            table.int('attendees_amt')
                .defaultTo(0)
                .notNullable();
            table.int('max_class_size')
                .defaultTo(64)
                .notNullable();
            table.bool('cancelled').defaultTo(false);
        })
        .createTable('instructors_classes', table => {
            table.int('user_id')
                .references('id')
                .inTable('users')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.int('class_id')
                .references('id')
                .inTable('classes')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.primary(['user_id', 'class_id']);
        })
        .createTable('clients_classes', table => {
            table.int('user_id')
                .references('id')
                .inTable('users')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.int('class_id')
                .references('id')
                .inTable('classes')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.primary(['user_id', 'class_id']);
            table.bool('paid').defaultTo(false);
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('instructor_classes')
        .dropTableIfExists('classes')
        .dropTableIfExists('roles')
        .dropTableIfExists('signup_codes')
        .dropTableIfExists('users')
        .dropTableIfExists('instructors_classes')
        .dropTableIfExists('clients_classes')
};
