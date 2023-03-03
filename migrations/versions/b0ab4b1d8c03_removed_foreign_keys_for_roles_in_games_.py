"""removed foreign keys for roles in games model

Revision ID: b0ab4b1d8c03
Revises: 907826446c7f
Create Date: 2023-03-02 15:23:25.346200

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b0ab4b1d8c03'
down_revision = '907826446c7f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.drop_constraint('games_time_shifter_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_jesus_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_cultist_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_necromancer_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_antideath_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_medium_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_mystic_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_disruptor_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_death_fkey', type_='foreignkey')
        batch_op.drop_constraint('games_psychic_fkey', type_='foreignkey')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.create_foreign_key('games_psychic_fkey', 'users', ['psychic'], ['id'])
        batch_op.create_foreign_key('games_death_fkey', 'users', ['death'], ['id'])
        batch_op.create_foreign_key('games_disruptor_fkey', 'users', ['disruptor'], ['id'])
        batch_op.create_foreign_key('games_mystic_fkey', 'users', ['mystic'], ['id'])
        batch_op.create_foreign_key('games_medium_fkey', 'users', ['medium'], ['id'])
        batch_op.create_foreign_key('games_antideath_fkey', 'users', ['antideath'], ['id'])
        batch_op.create_foreign_key('games_necromancer_fkey', 'users', ['necromancer'], ['id'])
        batch_op.create_foreign_key('games_cultist_fkey', 'users', ['cultist'], ['id'])
        batch_op.create_foreign_key('games_jesus_fkey', 'users', ['jesus'], ['id'])
        batch_op.create_foreign_key('games_time_shifter_fkey', 'users', ['time_shifter'], ['id'])

    # ### end Alembic commands ###
