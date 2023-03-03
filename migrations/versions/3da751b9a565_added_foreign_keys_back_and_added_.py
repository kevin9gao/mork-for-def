"""added foreign keys back and added foreign_keys property on players relationship

Revision ID: 3da751b9a565
Revises: b0ab4b1d8c03
Create Date: 2023-03-02 15:29:30.380437

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3da751b9a565'
down_revision = 'b0ab4b1d8c03'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'users', ['time_shifter'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['necromancer'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['death'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['psychic'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['medium'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['jesus'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['disruptor'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['antideath'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['cultist'], ['id'])
        batch_op.create_foreign_key(None, 'users', ['mystic'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('games', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')

    # ### end Alembic commands ###
